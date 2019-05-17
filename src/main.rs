pub mod scraper;
pub mod storage;

// TODO: Parse JSON       (X)
//       Get page content (X)
//       Get items        (X)
//       Update items     (X)
//
//       Send updates to Discord (.)
//       Get info from client    (.)

fn main() {
    let store = storage::Storage::new("storage.vkf");
    let data = scraper::Descriptor::new("target.json").scrape();
}
