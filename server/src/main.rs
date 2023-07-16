use enigo::*;
use ws::CloseCode;
use ws::{listen, Handler, Message, Request, Response, Result, Sender};

struct Serv {
    out: Sender,
    cont: Enigo,
    connected: bool,
}

impl Handler for Serv {
    fn on_message(&mut self, msg: Message) -> Result<()> {
        handle_msg(msg.into_text().unwrap(), &mut self.cont);
        self.out.send("some ms")
    }
    fn on_close(&mut self, code: CloseCode, reason: &str) {
        self.connected = false;
        dbg!(&code, &reason);
    }

    fn on_request(&mut self, req: &Request) -> Result<Response> {
        if req.resource() == "/ws" && !self.connected {
            println!("Someone connected");
            let mut res = Response::from_request(req).unwrap();
            res.headers_mut().push((
                "Access-Control-Allow-Origin".to_string(),
                // "http://localhost:5172".as_bytes().to_vec(),
                "*".as_bytes().to_vec(),
            ));
            self.connected = true;
            return Ok(res);
        } else if self.connected {
            return Ok(Response::new(200, "OK", "Someone already connected".as_bytes().to_vec()));
        } else {
        return Ok(Response::new(200, "OK", "Helo".as_bytes().to_vec()));
        
    }
}

fn main() {
    let addr = "192.168.0.100:8080";
    println!("listning on {addr}");

    listen(addr, |out| Serv {
        out,
        cont: Enigo::new(),
        connected: false;
    })
    .unwrap();
}

fn handle_msg(msg: String, cont: &mut Enigo) -> Option<String> {
    let d: Vec<&str> = msg.trim().split_whitespace().collect();
    let sens = 3;
    // println!("{:?}", d);
    match d[0] {
        "Cl" => {
            if d.len() == 2 {
                println!("Clicked , Fingers: {}", d[1]);
                if d[1] == "1" {
                    cont.mouse_click(MouseButton::Left);
                } else if d[1] == "2" {
                    cont.mouse_click(MouseButton::Left);
                    cont.mouse_click(MouseButton::Left);
                } else if d[1] == "3" {
                    cont.mouse_click(MouseButton::Left);
                    cont.mouse_click(MouseButton::Left);
                    cont.mouse_click(MouseButton::Left);
                }
            }
        }
        "Dr" => {
            if d.len() == 2 {
                match d[1] {
                    "S" => cont.mouse_down(MouseButton::Left),
                    "E" => cont.mouse_up(MouseButton::Left),
                    _ => cont.mouse_up(MouseButton::Left),
                }
            } else if d.len() == 3 {
                println!("Dragged pos, x: {}, y: {}", d[1], d[2]);
                let x = d[1].parse::<i32>().unwrap();
                let y = d[2].parse::<i32>().unwrap();
                cont.mouse_move_relative(x, y);
            }
        }
        "MCl" => {
            if d.len() == 3 {
                println!("Multi Clicks, Clciked: {}, Touches: {}  ", d[1], d[2]);

                if d[1] == "1" && d[2] == "2" {
                    cont.mouse_click(MouseButton::Right);
                } else if d[1] == "1" && d[2] == "3" {
                    cont.mouse_click(MouseButton::Middle);
                }
            }
        }
        "CO" => {
            println!("Coustom Event: {}", d[1]);
            // TODO
        }
        "KE" => {
            println!("Key Event: {}", d[2])
           // TODO
        }
        _ => {
            println!(" Unknwn cmd: {:?}", d);
        }
    }

    None
}
