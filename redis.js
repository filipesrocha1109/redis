this.arrayTotal = [];
this.arrayZaddIndex = []; // myset2 -> posicao
this.arrayZadd = [];
this.arrayEx = [];

function command() {
    var txt = document.getElementById("txt").value;
    this.split = txt.split(" ");

    var valida = split[0];

    switch (valida) {

        case "set":
            var x = split[1]; // key
            var y = arrayTotal.indexOf(x);
            var z = y + 1;
            if (y != -1) {
                arrayTotal.splice(y, 2, split[1], split[2]);
            } else {
                arrayTotal.push(split[1], split[2]);
            }
            document.getElementById("result").innerHTML = "ok";
            break;

        case 'setex':
            var second = new Date;
            var x = split[1]; // key
            var u = arrayEx.indexOf(x);
            var y = parseInt(split[2]); // timeou 
            var z = split[3]; // value
            var t = second.getSeconds(); // segundo selecionado
            var a = arrayTotal.indexOf(x);

            if (u != -1) {
                arrayEx.splice(u, 4, x, y, z, t);
                arrayTotal.splice(a, 2, x, z)
            } else {
                arrayEx.push(x, y, z, t);
                arrayTotal.push(x, z)
            }
            break;

        case 'get':
            var data = new Date;
            var second = data.getSeconds();
            var x = split[1];
            var yx = arrayEx.indexOf(x); // index key ex
            var y = arrayTotal.indexOf(x); //index key toy
            var t = y + 1; // idex value tot
            var a = arrayEx[yx + 1]; // index timeout ex
            var b = a + 1; // index value ex
            var c = arrayEx[yx + 3]; // second definidos
            var aux;
            if (yx != -1) {
                if (a + c > 60) { //valida > 60 s
                    aux = a + c - 60
                    if (aux > second) {
                        arrayEx.splice(yx, 4)
                        arrayTotal.splice(y, 2);
                    }
                }
                if (a + c < 60) { //valida < 60 s
                    aux = a + c
                    if (aux > second) {
                        arrayEx.splice(yx, 4)
                        arrayTotal.splice(y, 2);
                    }
                }
            }
            document.getElementById("result").innerHTML = arrayTotal[y] + " = " + arrayTotal[t];
            break;

        case 'zadd':
            var x = split[1]; //myset
            var z = split[2]; // key
            var y = split[3]; //value
            if (arrayZaddIndex.indexOf(x) < 0) {
                arrayZaddIndex.push(x);
                arrayZadd[arrayZaddIndex.indexOf(x)] = new Array();
                arrayZadd[arrayZaddIndex.indexOf(x)].push(z, y);
            } else {
                arrayZadd[arrayZaddIndex.indexOf(x)].push(z, y);
            }
            document.getElementById("result").innerHTML = "ok";
            break;

        case 'dbsize':
            document.getElementById("result").innerHTML = "DBSIZE : " + arrayTotal.length / 2;
            break;

        case 'zrange':
            var x = split[1]; //myset
            var z = split[2]; // inico
            var y = split[3]; //fim
            start = 0;
            end = 0;
            if (arrayZaddIndex.indexOf(x) < 0) {
                console.log('erro: key not found');
                return;
            }
            if (z < 0) {
                z = z * (-1);
                start = arrayZadd[arrayZaddIndex.indexOf(x)].length - z;
            } else {
                start = parseInt(z) * 2;
                start++;
            }
            if (y < 0) {
                y = y * (-1);
                end = arrayZadd[arrayZaddIndex.indexOf(x)].length - (y * 2);
                end++;
            } else {
                end = y * 2;
                end++;
            }
            for (i = start; i <= end; i++) {
                i++;
            }
            break;

        case 'gettot':
            document.getElementById("result").innerHTML = "GET ALL: " + arrayTotal;
            break;

        case 'delete':
            var x = split[1];
            var y = arrayTotal.indexOf(x);
            var z = y + 1;
            arrayTotal.splice(y, 2);
            document.getElementById("result").innerHTML = "ok";
            break;

        case 'incr':
            var x = split[1];
            var y = arrayTotal.indexOf(x);
            var z = y + 1;
            if (isNaN(arrayTotal[z]) === false) {
                var res = arrayTotal[z];
                var res = parseInt(res) + 1;
                var t = parseInt(z);
                arrayTotal.splice(z, 1, res)
            } else {
                document.getElementById("result").innerHTML = "not a number";
            }
            break;

        case 'zcard':
            var x = split[1]; //myset
            if (arrayZaddIndex.indexOf(x) < 0) {
                document.getElementById("result").innerHTML = "erro: key not found";
                return;
            }
            document.getElementById("result").innerHTML = "ZCARD : " + arrayZadd[arrayZaddIndex.indexOf(x)].length / 2;
            break;

        case 'zrank':
            var x = split[1]; //myset
            var z = split[2]; //value
            if (arrayZaddIndex.indexOf(x) < 0) {
                document.getElementById("result").innerHTML = "erro: key not found";
                return;
            }
            document.getElementById("result").innerHTML = "ZRANK : " + (arrayZadd[arrayZaddIndex.indexOf(x)].indexOf(z) - 1) / 2;
            break;
        default:
            document.getElementById("result").innerHTML = 'erro';
    }

}


function keyCode(event) {
    var x = event.keyCode;
    if (x == 13) {
        command();
        document.getElementById('txt').value = '';
    }
}
/*
if (split[0] === "get") {
    var x = split[1];
    var y = arrayTotal.indexOf(x);
    var z = y + 1;
    document.getElementById("result").innerHTML = arrayTotal[y] + " = " + arrayTotal[z];
}
*/