const fs = require("fs");

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Core Node</title></head>");
    res.write(
      '<body><h2>Node is based on REPL</h2> <form action="/message" method="POST"> <input type="text" name="message"> </input> <button type="submit">Send Request</button> </form></body>'
    );
    res.write("</body>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = requestHandler;
