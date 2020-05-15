function uyari(){
    var x= confirm("Silmek istediğinize emin misiniz?");
    if(x){
    return true;
    }
    else {
    return false;
    }
}
var rows = document.querySelector("table").getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    document.getElementById("count").innerHTML = rows;