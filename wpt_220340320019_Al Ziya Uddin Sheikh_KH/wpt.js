
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'pleasework',
	port:3306
});

const express = require('express');
const app = express();
app.use(express.static('abc'));

app.get('/poc2', function (req, res) {
    
	output={status:false,rows:""};
    console.log("reading input " + req.query.bookid);
    
    connection.query("select * from book where bookid = ?", [req.query.bookid], (err, res1) => {
    
        
        if (err) {
            
			console.log("trouble" + err);
        } else {
            if(res1.length>0){
            
            output.rows=res1;
            output.status=true;
			console.log("success" + output)
            }else{
                console.log("res1 not found");
            }
        }
		
		
        res.send(output);
    });
});


    //-------------------------------------------------------------
    app.get('/update', function (req, res) {
    
        output={ status:false, bookid : req.query.input.bookid, bookname : req.query.input.bookname,price :req.query.input.price};
        console.log("reading input " + req.query.bookid);
        
        connection.query("update book set bookname=? , price =? where bookid = ?", [output.bookname,output.price,output.bookid], (err, res1) => {
        
            
            if (err) {
                
                console.log("trouble" + err);
            } else {
                if(res1.affectedRows>0){
                
                output.rows=res1;
                output.status=true;
                console.log("success" + output)
                }
                  res.send(output);
            }
            
            
          
        });
    

    

    });




app.listen(8081, function () {
console.log("server listening at port 8081...");
})
