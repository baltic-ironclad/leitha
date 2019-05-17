use std::{
    fs::{File, OpenOptions},
    io::{Error, Read, Write},
    path::PathBuf
};


#[allow(dead_code)]
pub struct Storage {
    name: String,
    data: Vec<String>,
    path: PathBuf
}

impl Storage {
    pub fn new(name: &str) -> Storage {
        let path: PathBuf = ["data", name].iter().collect();
        let data: Vec<String> = Vec::new();

        // Try creating storage file
        OpenOptions::new().append(true).create(true).open(&path).expect("Cannot create database");

        Storage { name: name.to_string(), data, path }
    }

    pub fn load(&mut self) -> Result<(), Error> {
        let mut data = String::new();
        let mut file = File::open(&self.path).expect("Cannot open database");

        // Read data from database to buffer
        file.read_to_string(&mut data).expect("Cannot read from database");
        let data = data.lines().map(|entry| entry.to_string()).collect();
        self.data = data;

        Ok(())
    }

    #[allow(unused_must_use)]
    pub fn write(self) -> Result<(), Error> {
        let mut file = OpenOptions::new().append(true).create(true).open(&self.path).expect("Cannot open database");
        for entry in self.data {
            writeln!(&mut file, "{}", entry)?;
        }

        Ok(())
    }

    pub fn add(&mut self, new: String) {
        // Exit if exact match
        for entry in self.data.iter() {
            if new == *entry { return; }
        }

        self.data.push(new);
    }

    pub fn update(&mut self, addition: Vec<String>) {
        let mut data = Vec::new();
        
        for new in addition.iter() {
            for entry in self.data.iter() {
                if new == entry { return; }
            }
            data.push(new.clone());
        }

        self.data = data;
    }
}