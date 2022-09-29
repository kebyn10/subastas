const express = require('express')
const app = express()
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/subastas.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3005
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const sessions = require('express-session');
const url = require('url');
const querystring = require('querystring');

const timeEXp = 1000 * 60 * 60 * 24;

app.use(sessions({
  secret: "rndnsdgnednfeubawejbsjvbsdjfbsdjhvjzedakalicamillesdjhdsfhjstjdeqwewq",
  saveUninitialized: true,
  cookie: {
    maxAge: timeEXp
  },
  resave: false
}));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'subastarlo@gmail.com',
    pass: 'mxdwurcenpwfjlvl'
  }
});

conectado = false;

app.get('/', (req, res) => {
  session = req.session;
  if (session.userid) {
    conectado = true
    if (conectado == true) {
      return res.render('index', {
        nombre: session.usernom
      })
    }

  }
  res.render('index');


})

app.get('/errorcontra', (req, res) => {
  res.render('contrasenaincorrecta')
})

app.get('/erroredad', (req, res) => {
  res.render('mayor')
})

app.get('/errorusu', (req, res) => {
  res.render('usuario')
})

app.get('/registrar', (req, res) => {
  res.render('registro')
})
app.get('/factura', (req, res) => {
  res.render('factura')
})

app.get('/tb/:idarticulo', (req, res) => {
  session = req.session;

  if (session.userid) {
   

    let id = req.params.idarticulo;
    codigo_referencia=id;

    db.all("SELECT numero_puja,cantidad_ofrecida,fecha,codigo_referencia,usuario,nombre FROM Puja  WHERE codigo_referencia=$codigo_referencia   ", {
      $codigo_referencia:codigo_referencia
    }, (error, row) => {
      
if (!error) {
  gg=row
    res.render('tabla', {
   gg
  });
}
if (error) {
  console.log("error");
}




    })
 


  }


else {
    res.render('login')
  }

})

app.get('/tbp/:idarticulo', (req, res) => {
  session = req.session;

  if (session.userid) {
   

    let id = req.params.idarticulo;
    codigo_referencia=id;

    db.all("SELECT numero_puja,cantidad_ofrecida,fecha,codigo_referencia,usuario,nombre FROM Puja  WHERE codigo_referencia=$codigo_referencia   ", {
      $codigo_referencia:codigo_referencia
    }, (error, row) => {
      
if (!error) {
  gg=row
    res.render('tablaace', {
   gg
  });
}
if (error) {
  console.log("error");
}




    })
 


  }


else {
    res.render('login')
  }

})



cone=true


app.get('/cata', (req, res) => {
  
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha,email FROM articulo ", {

  }, (error, row) => {
    tt = row
    cone=false 
    session = req.session;
    email=req.session.userid;
    if (session.userid) {
      cone = true
      if (cone == true) {
        return res.render('cata',{
          nombre: session.usernom,tt

        })
      }
  
    }

    if (!error) {

     
      res.render('cata', {
        tt
      }
     
      
      );
    
    }
  
  })
})

app.get('/cata2', (req, res) => {
  
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha,email FROM articulo ", {

  }, (error, row) => {
    tt = row
    cone=false 
    session = req.session;
    email=req.session.userid;
    if (session.userid) {
      cone = true
      if (cone == true) {
        return res.render('cata2',{
          nombre: session.usernom,tt

        })
      }
  
    }

    if (!error) {

     
      res.render('cata', {
        tt
      }
     
      
      );
    
    }
  
  })
})



app.get('/historial', (req, res) => {
  
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha,email FROM articulo ", {

  }, (error, row) => {
    tt = row
    cone=false 
    session = req.session;
    email=req.session.userid;
    if (session.userid) {
      cone = true
      if (cone == true) {
        return res.render('historial',{
          nombre: session.usernom,tt

        })
      }
  
    }

    if (!error) {

     
      res.render('cata', {
        tt
      }
     
      
      );
    
    }
  
  })
})








app.get('/electrodomesticos', (req, res) => {
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha FROM articulo WHERE tipo in ('Electrodomesticos') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('electrodomesticos', {
        tt
      });

    }

  })
})


app.get('/crearsubasta', (req, res) => {
  res.render('crearsubasta')
})
app.get('/joyeria', (req, res) => {
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha FROM articulo WHERE tipo in ('Joyeria') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('joyeria', {
        tt
      });

    }

  })
})



app.get('/vehiculos', (req, res) => {
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha FROM articulo WHERE tipo in ('Vehiculos') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('vehiculos', {
        tt
      });

    }

  })
})

app.get('/propiedades', (req, res) => {
  db.all("SELECT codigo_referencia,precio,nombre,imagen,estado,tipo,fecha FROM articulo WHERE tipo in ('Propiedades') ", {}, (error, row) => {
    if (!error) {

      tt = row
      res.render('propiedades', {
        tt
      });

    }

  })
})

app.get('/actualizarproducto', (req, res) => {
  res.render('actualizarproducto')
})



app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/pruebas', (req, res) => {
  res.render('pruebas')
})

app.get('/cambiarcontra', (req, res) => {
  res.render('cambiocontra')
})

app.get('/cerrar', (req, res) => {
  res.render('cerrar')
})

app.get('/verificar', (req, res) => {
  res.render('verificar')
})
app.get('/eliminarproducto', (req, res) => {
  res.render('eliminarproducto')
})

app.get('/actualizar', (req, res) => {
  res.render('actualizar')
})
app.get('/vendido', (req, res) => {
  res.render('vendido')
})

app.post('/registro', (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let number = req.body.number;
  let age = req.body.age;
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  if (age < 18) {
    res.render('mayor')
  } else {
    db.run(`INSERT INTO Usuario(email, name, number, age, password) VALUES(?, ?, ?, ?, ?)`,
      [email, name, number, age, hash],
      function (error) {
        if (!error) {
          res.render('login');
          console.log("Insert OK");
          transporter.sendMail({
            from: 'subastarlo@gmail.com',
            to: email,
            subject: 'Test Email Subject',
            html: '<h1>hola cabron</h1>'
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
        } else {
          console.log("Insert error", error.code);
          if (error.code == "SQLITE_CONSTRAINT") {
            return res.render('usuario')
          }
          return res.send('error')
        }
      }
    )
  };
})


app.post('/aggproducto', (req, res) => {
  let nombre = req.body.nombre;
  let precio = req.body.precio;
  let estado = req.body.estado;
  let tipo = req.body.tipo;
  let imagen = req.body.imagen;
  let fecha = new Date();
  session=req.session;
  email=req.session.userid;
  nom=req.session.usernom;
  arreglo = [, fecha.getDate(),"/", fecha.getMonth() + 1,"/", fecha.getFullYear(), ]
  listo = arreglo.join(" ");
  db.run(`INSERT INTO articulo(codigo_referencia,precio,nombre,imagen,estado,tipo,fecha,email ) VALUES(?, ?, ?, ?,?,?,?,?) `,
  [,precio,nombre, imagen,estado,tipo,listo,email],
  
    function (error) {
      if (!error) {
        console.log("producto creado");
   
        return res.redirect('/pujadefe');
      } else {
        console.log("error", error.code);
      }

    }
  )
})
app.get('/pujadefe', (req, res) => {
  session=req.session;
  email=req.session.userid;
  nom=req.session.usernom;
  let fecha = new Date();
  arreglo = [, fecha.getDate(),"/", fecha.getMonth() + 1,"/", fecha.getFullYear(), ]
  listo = arreglo.join(" ");
db.run(`INSERT INTO Puja(numero_puja,cantidad_ofrecida,fecha,codigo_referencia,usuario,nombre ) VALUES((SELECT max(Puja.numero_puja)+1 FROM Puja), 0, $listo, (SELECT max(articulo.codigo_referencia) FROM articulo),$email,$nom); `,
{$listo:listo,$email:email,$nom:nom},
function (error) {
if (!error) {
console.log("si");

return res.redirect('/cata');
} else {
console.log("error", error.code);
}

}
)})

app.post('/logica', (req, res) => {

  let email = req.body.email;
  let password = req.body.password;
  db.get("SELECT password,name FROM Usuario WHERE email=$email", {
    $email: email
  }, (error, row) => {
    if (error) {
      return res.send("Ha ocurrido un error desconocido");
    }
    console.log(row);
    if (row) {
      console.log(row.password);
      if (bcrypt.compareSync(password, row.password)) {
        session = req.session;

        session.userid = email;
        session.usernom = row.name;
        return res.redirect('/');

      }
      return res.render('incorrecto');
    }
    return res.render('existe');
  });
})

app.post('/veri', (req, res) => {
  email = req.session.userid;
  let password = req.body.password;
  db.get("SELECT password FROM Usuario WHERE $email=email  ", {
    $email: email
  }, (error, row) => {
    if (error) {
      return res.send("Ha ocurrido un error desconocido");
    }
    console.log(row);
    if (row) {
      console.log(row.password);
      if (bcrypt.compareSync(password, row.password)) {

        return res.render('cambiocontra');

      }
      return res.render('contrasenaincorrecta');
    }
  });
})



app.get('/finalizar/:idarticulo/:persona/:pu', (req, res) => {

  let id = req.params.idarticulo;
  let persona=req.params.persona;
  let pu=req.params.pu;
  
  db.run(`UPDATE articulo SET estado=? WHERE codigo_referencia=?`,
    ["inactivo",id], 
    (error, row) => {

      if (!error) {
        

       
        db.run(`INSERT INTO historial(nombre_cliente,nro_compra,email_cliente,codigo_comprado,cod_puja_h,dueño,imagen,totalf,nombre_articulo)    VALUES ((SELECT  DISTINCT(Puja.nombre) FROM Puja WHERE Puja.usuario=$persona   AND Puja.codigo_referencia=$id  


        AND Puja.numero_puja=$pu),(SELECT max(historial.nro_compra)+1 FROM historial) ,(SELECT  DISTINCT(Puja.usuario) FROM Puja WHERE Puja.usuario=$persona  AND Puja.codigo_referencia=$id 


        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(Puja.codigo_referencia) FROM Puja WHERE Puja.usuario=$persona  AND Puja.codigo_referencia=$id 


        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(Puja.numero_puja) FROM Puja WHERE Puja.usuario=$persona  AND Puja.codigo_referencia=$id 


        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(articulo.email) FROM articulo,Puja WHERE  articulo.codigo_referencia=$id
        
        
        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(articulo.imagen) FROM articulo,Puja WHERE  articulo.codigo_referencia=$id
        
        
        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(Puja.cantidad_ofrecida) FROM Puja WHERE Puja.usuario=$persona  AND Puja.codigo_referencia=$id 


        AND Puja.numero_puja= $pu),(SELECT  DISTINCT(articulo.nombre) FROM articulo,Puja WHERE  articulo.codigo_referencia=$id
        
        
        AND Puja.numero_puja= $pu));`,{$pu:pu,$id:id,$persona:persona},
    
  
        (error, row) => {
          if (!error) {
        
                res.redirect('/vendido');
            

          }
          if (error) {
            return console.log("error");
          }
  
  
        }
  
  
      )
  
       
     



      }

      if (error) {
        console.log(error);
        res.send("no se pudo cargar")
      }


    }

  )
});

app.post('/contra', (req, res) => {

  email = req.session.userid;
  let password = req.body.password;
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  db.run(`UPDATE Usuario SET password=? WHERE email=?`,
    [hash, email],
    (error, row) => {

      if (!error) {


        req.session.destroy();
        conectado = false
        return res.redirect('/login');



      }

      if (error) {
        console.log(error);
        res.send("no se pudo cargar")
      }


    }

  )
});

app.get('/minfo', (req, res) => {
  email = req.session.userid;
  db.get("SELECT email, name, number, age FROM Usuario WHERE $email=email  ", {
    $email: email
  }, (error, row) => {

    if (!error) {

      /*res.send(row);*/
      res.render('infoUsuario', {
        data: [{
          email: row.email,
          name: row.name,
          number: row.number,
          age: row.age,
        }]
      });

    }
    if (error) {
      console.log(error);
    }
  })
})

app.post('/actu', (req, res) => {
  email = req.session.userid;
  let name = req.body.name;
  let number = req.body.number;
  let age = req.body.age;
  db.run(`UPDATE Usuario SET name=?,number=?,age=? WHERE email=?`,
    [name, number, age, email],
    (error, row) => {

      if (!error) {
       return res.redirect('/');
      }
      if (error) {
        console.log(error);
        res.send("no se pudo cargar")
      }
    }
  )
});
app.post('/editararticulo', (req, res) => {
  let codigo_referencia = req.body.codigo_referencia;
  let nombre = req.body.nombre;
  let precio = req.body.precio;
  let estado = req.body.estado;
  let tipo = req.body.tipo;
  let imagen = req.body.imagen;
  email = req.session.userid;
 
  db.run(`UPDATE articulo SET precio=?,nombre=?,imagen=?,estado=?,tipo=? WHERE codigo_referencia=?`,
    [precio,nombre, imagen,estado,tipo,codigo_referencia],

    function (error) {
      if (!error) {

        return res.redirect('/cata')
      }

      if (error) {
        console.log(error);

      }


    }

  ) 
});

app.post('/eliminar_articulo', (req, res) => {
  let codigo_referencia = req.body.codigo_referencia;


  db.run(`DELETE FROM articulo WHERE $codigo_referencia=codigo_referencia `, {
      $codigo_referencia: codigo_referencia
    },

    function (error) {
      if (!error) {


        res.redirect('/cata');
      }
      if (error) {
        console.log(error);
        res.send("no se pudo eliminar este producto")
      }
    }


  )
});

app.get('/logout', (req, res) => {
  session = req.session;
  if (session.userid) {
    req.session.destroy();
    conectado = false
    return res.redirect('/');
  }
  return res.redirect('/login')

})

app.get('/comprar/:idarticulo', (req, res) => {
  session = req.session;

  if (session.userid) {
    let id = req.params.idarticulo;

    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
    }
codigo_referencia=id
    db.get("select a.nombre,a.estado,a.imagen,a.fecha,a.precio,a.codigo_referencia, max(p.cantidad_ofrecida) as elejida from articulo as a left join Puja as p on $codigo_referencia=a.codigo_referencia and $codigo_referencia=p.codigo_referencia ", { 
    $codigo_referencia:codigo_referencia}, (error, row) => {

if (!error) {
  
  res.render('factura', {
    data: [{
      estado:row.estado,
      tipo:row.tipo,
      nombre: row.nombre,
      total:row.precio,
      puja:row.elejida,
      codigo_referencia:row.codigo_referencia,
      imagen: row.imagen,
      fecha:row.fecha,
      
  
    }]
  });
}
if (error) {
  return console.log("error");
}




    })
 


  }


else {
    res.render('login')
  };

})
app.get('/comprarp/:idarticulo', (req, res) => {
  session = req.session;

  if (session.userid) {
    let id = req.params.idarticulo;

    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
    }
codigo_referencia=id
    db.get("select a.nombre,a.estado,a.imagen,a.fecha,a.precio,a.codigo_referencia, max(p.cantidad_ofrecida) as elejida from articulo as a left join Puja as p on $codigo_referencia=a.codigo_referencia and $codigo_referencia=p.codigo_referencia ", { 
    $codigo_referencia:codigo_referencia}, (error, row) => {

if (!error) {
  
  res.render('facturacopy', {
    data: [{
      estado:row.estado,
      tipo:row.tipo,
      nombre: row.nombre,
      total:row.precio,
      puja:row.elejida,
      codigo_referencia:row.codigo_referencia,
      imagen: row.imagen,
      fecha:row.fecha,
      
  
    }]
  });
}
if (error) {
  return console.log("error");
}




    })
 


  }


else {
    res.render('login')
  };

})






app.get('/comprarh/:idarticulo', (req, res) => {
  session = req.session;
  let id = req.params.idarticulo;
  email = req.session.userid;
  if (session.userid) {
   

    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
    }
   
    db.get("SELECT nombre_cliente,nro_compra,email_cliente,codigo_comprado,cod_puja_h,due,imagen,totalf,nombre_articulo FROM historial WHERE $id=codigo_comprado AND $email=due", { 
    $id:id,$email:email}, 
    (error, row) => {

if (!error) {
 
  res.render('facturaarticulo', {
    data: [{
      nombre_cliente:row.nombre_cliente,
      nro_compra:row.nro_compra,
      email_cliente:row.email_cliente,
      codigo_comprado:row.codigo_comprado,
      cod_p:row.cod_puja_h,
      due:row.due,
      imagen:row.imagen,
      totalf:row.totalf,
      nombre_articulo:row.nombre_articulo,
 
      
  
    }]
  });
}
if (error) {
  return console.log("error");
}




    })
 


  }


else {
    res.render('login')
  };

})








//aca :idarticulo es un parametro de ruta 
app.post('/comprarr/:idarticulo', (req, res) => {

  session = req.session;

  if (session.userid) {
    //recogemos el id del articulo a comprar
    let id = req.params.idarticulo;
    email = req.session.userid;
    nombre=req.session.usernom ;
    let cantidad_ofrecida = req.body.cantidad_ofrecida;
    //validamos el parametro
    let validatorId = parseInt(id)
    if (isNaN(validatorId)) {
      return res.send("Ingrese id de producto válido");
    }
    //hacemos el proceso de compra en la bd...
    let fecha = new Date();
    arreglo = [, fecha.getDate(),"/", fecha.getMonth() + 1,"/", fecha.getFullYear(), ]
    listo = arreglo.join(" ");
    db.run(`INSERT INTO Puja(numero_puja,cantidad_ofrecida,fecha,codigo_referencia,usuario,nombre)   VALUES(?,?,?,?,?,?)`,
      [, cantidad_ofrecida,listo,id, email,nombre],

      function (error) {
        if (!error) {
          res.redirect('/cata')
           transporter.sendMail({
               from: 'subastarlo@gmail.com',
               to: email,
               subject: 'Test Email Subject',
               html: '<img src="https://res.cloudinary.com/dwczm63h6/image/upload/v1654784841/floristeria%20aqua/Tarjeta_de_Visita_Una_Cara_Vertical_Profesional_Morado_y_Rosa_pdmiwk.png" alt="">'
             }).then((res) =>{console.log(res);}).catch((err) => {console.log(err);})
        }
        if (error) {
          return console.log("error");
        }


      }


    )
    //enviamos un correo de confirmacion de compra...
    //retornamos un mensaje de compra exitosa


  } else {
    res.render('porfaini')
  };
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})