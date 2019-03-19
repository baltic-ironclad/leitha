extern crate reqwest; // Send HTTP requests
extern crate select; // Inspect element

extern crate clap; // Work with command line

extern crate serde_derive;
extern crate serde; // Serialize and deserialize
extern crate serde_json; // Read and write JSON

use std::fs::File;
use std::io::Read;
use std::path::Path;

pub fn get_page(url: &str) -> String {
    let client = reqwest::Client::new();
    let mut request = client.get(url);
    let mut response = request.send().unwrap();

    assert!(response.status().is_success());
    return response.text().unwrap();
    // TODO: Parse item
}

pub fn get_data(name: &str) {
    let file_path = Path::new("data").join(name);
    let file = File::open(file_path).expect("File not found");
    // TODO: Process JSON data
}

fn main() {}
