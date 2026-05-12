if (!sessionStorage.getItem("money")) {
    sessionStorage.setItem("money", "0");
}
if (Number(sessionStorage.getItem("money")) > 200) {
    document.getElementById('p4').classList.remove('unavailable');
    document.getElementById('p3r').classList.remove('unavailable');
}
else if (Number(sessionStorage.getItem("money")) > 100) {
    document.getElementById('p4').classList.remove('unavailable');
}

createMoney();