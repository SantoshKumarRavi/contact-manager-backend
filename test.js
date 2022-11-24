app.post("/upload", async (req, res) => {
    let file = req.files.csvfile;
    console.log(file)
    file.mv("./upload/" + file.name, (err) => {
        if (err) {
            res.json(JSON.stringify(err))
        }
    })
    try {
        let jsonArray = await csv().fromFile(__dirname + `/upload/${file.name}`)
        console.log(jsonArray)
        console.log(jsonArray.length)
        const data = await contacts.create(jsonArray)
        res.json({
            status: "Success",
            message: "File Uploaded Successfully"
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
})