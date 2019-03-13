extern crate reqwest;
extern crate select;
extern crate scraper;

use select::document::Document;
use select::predicate::{Class, Name};

pub fn load_page(url: &str) {
    let response = reqwest::get(url).unwrap();
    assert!(response.status().is_success());

    let document = Document::from_read(response).unwrap();

    for node in document.find(Class("product")) {
        let name = node.find(Class("brand-name")).next().unwrap().text();
        let code = node.find(Name("h3")).next().unwrap().text();
        let price = node.find(Name("strong")).next().unwrap().text();
    }
}

fn main() {
    load_page("https://www.off---white.com/en/RU/section/new-arrivals");
}
