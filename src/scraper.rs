use std::{
    fs::File,
    io::Read,
    path::PathBuf
};
use scraper::{Html, Selector};
use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Descriptor {
    url: String,
    tag: String,
    class: String
}

impl Descriptor {
    pub fn new(filepath: &str) -> Descriptor {
        let result = read_json(filepath)
            .expect("Specified JSON is not valid");

        // Try converting JSON to Struct
        let result: Descriptor = serde_json::from_value(result)
            .expect("JSON cannot be converted to Descriptor");

        result
    }

    // FIXME: Kinda ugly
    pub fn string(self) -> String {
        let mut result = self.tag;
        result += &(".".to_owned() + &self.class);

        result
    }

    pub fn scrape(self) -> Vec<String> {
        let mut result = Vec::new();
        let client = reqwest::Client::new();
        let request = client.get(&self.url);

        // Handle response
        let mut response = request.send().expect("Response was not supplied");
        assert!(response.status().is_success());
        let response = response.text().expect("Response cannot be formatted"); 
        
        let document = Html::parse_document(&response);

        let selector = Selector::parse(&self.string()).expect("Selector is not valid");

        // Get list of elements with specified selector
        for element in document.select(&selector) {
            result.push(element.text().collect::<Vec<_>>()
                .first().expect("No element found for specified selector").to_string());
        }
        
        result
    } 
}

pub fn read_json(filepath: &str) -> Result<serde_json::Value, serde_json::error::Error> {
    let filepath: PathBuf = ["data", filepath].iter().collect();
    let mut file = File::open(filepath).expect("Cannot open file");
    let mut contents = String::new();

    file.read_to_string(&mut contents).expect("Cannot read file");

    // Try casting String to JSON    
    let json: serde_json::Value = serde_json::from_str(&contents[..])
        .expect("Error occured while parsing"); 
    
    Ok(json)
}
