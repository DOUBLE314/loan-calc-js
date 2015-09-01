/**
 * Created by Валерий on 25.05.2015.
 */
function calculate() {
    //Ищем элементы ввода и вывода в документа
    var amount = document.getElementById ("amount");
    var ai = document.getElementById("ai");
    var years = document.getElementById("years");
    var ziploc = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total_interest = document.getElementById("total_interest");
    //Переводим процентную ставку из процентов в десятичное число,
    //также переводим годовую ставку в месячную ставку
    var major = parseFloat(amount.value);
    var interest = parseFloat(ai.value)/100/12;
    var payments = parseFloat(years.value)*12;
    //Вычисляем сумму ежемесячного платежа
    var x = Math.pow(1+interest, payments);
    var monthly = (major*x*interest)/(x-1);
    // Если результатом является конечное число,
    // то пользователь указал корректные данные
    // и можно отобразить результаты

    if(isFinite(monthly)){
        //Заполняем поля ввода, округлив до 2х десятичных знаков
        payment.innerHTML = monthly.toFixed(2);
        total_interest.innerHTML =(monthly*payments).toFixed(2);
        chart(major, interest, monthly, payments);
    }

else {
// Результат не является числом или имеет бесконечное значение,
// что означает, что были введены неполные или некорректные данные.
// Очистить все результаты, полученные  ранее.
    payment.innerHTML = "";
    total_interest.innerHTML = "";
    chart(); // При вызове без аргументов очищаем диаграмму
}
}
// Сохранить ввод пользователя в свойствах объекта localStorage.
var save = function(amount, ai, years, ziploc) {
    if (window.localStorage) { // Выполнить сохранение
        localStorage.loan_amount = amount;
        localStorage.loan_ai = ai;
        localStorage.loan_years = years;
        localStorage.loan_ziploc = ziploc;
    }
};

window.onload = function() {
// Если браузер поддерживает localStorage
    if (window.localStorage && localStorage.loan_amount) {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("ai").value = localStorage.loan_ai;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("ziploc").value = localStorage.loan_ziploc;
    }
};

