pub mod scraper;
pub mod storage;

// TODO: Parse JSON       (X)
//       Get page content (X)
//       Get items        (X)
//       Update items     (X)
//
//       Send updates to Discord (.)
//       Get updates from client (X)

fn main() {
    let matches = clap::App::new("Leitha")
        .version("0.1.1")
        .author("Sergey K. and Dmitriy K.")
        .about("Website monitoring service")
        .arg(clap::Arg::with_name("ip")
            .short("i").long("ip")
            .help("Set IP")
        )
        .arg(clap::Arg::with_name("port")
            .short("p").long("port")
            .help("Set port")
        )
        .arg(clap::Arg::with_name("hook")
            .short("h").long("hook")
            .help("Configure Discord Webhook")
    ).get_matches();

    let ip = if matches.is_present("ip") { matches.value_of("ip").unwrap() } else { "1337" };
    let port = if matches.is_present("port") { matches.value_of("port").unwrap() } else { "127.0.0.1" };
    let connection: String = port.to_owned() + ":" + ip;
    
    ws::listen(connection, |_out| {
        move |message: ws::Message| {
            if let Ok(text) = message.into_text() {
                match serde_json::from_str::<scraper::Descriptor>(&text) {
                    Ok(status) => {
                        println!("Received update");
                        let mut storage = storage::Storage::new("storage.vkf");
                        storage.update(scraper::Descriptor::new("target.json").scrape());
                        storage.write();
                    },
                    Err(error) => println!("Could not parse JSON: {}", error)
                }
            }
            Ok(())
        }
    }).unwrap()
}
