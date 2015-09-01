/**
 * Created by Валерий on 25.05.2015.
 */

function chart(major, interest, monthly, payments) {
    var graph = document.getElementById("graph");
    var canvas = document.createElement("canvas");// Ссылка на тег <canvas>
    graph.width = graph.width; // Очистка элемента canvas
// Если функция вызвана без аргументов или броузер не поддерживает
// элемент <canvas>, то возвращаем управление.
    if (arguments.length == 0 || !graph.getContext) return;
    var g = graph.getContext("2d"); // Рисуем объект
    var width = graph.width, height = graph.height;// Получить размер холста
// Преобразование количества месячных платежей в пикселы
    function paymentToX(n) {
        return n * width / payments;
    }

    function amountToY(a) {
        return height - (a * height / (monthly * payments * 1.05));
    }

// Платежи - прямая линия из точки (0,0) в точку (payments,monthly*payments)
    g.moveTo(paymentToX(0), amountToY(0)); // Из нижнего левого угла
    // В правый верхний
    g.lineTo(paymentToX(payments), amountToY(monthly * payments));
    g.lineTo(paymentToX(payments), amountToY(0));
// В правый  нижний
    g.closePath(); // И обратно
    g.fillStyle = "#f88"; // Светло - красный
    g.fill(); // Залить  треугольник
    g.font = "bold 12px sans-serif"; // Определить шрифт
    g.fillText("Общий выплаченный процент", 20, 20); // Вывести текст в легенде
    var equity = 0;
    g.beginPath(); // Новая фигура
    g.moveTo(paymentToX(0), amountToY(0)); // из левого нижнего угла
    for (var p = 1; p <= payments; p++) {
// Для каждого платежа определить долю выплат по процентам
        var thisMonthsInterest = (major - equity) * interest;
        equity += (monthly - thisMonthsInterest); // Остаток - погашение кред.
        g.lineTo(paymentToX(p), amountToY(equity)); // Линию до этой точки
    }
    g.lineTo(paymentToX(payments), amountToY(0)); // Линию до оси X
    g.closePath(); // И опять в нач. точку
    g.fillStyle = "green"; // Зеленый
    g.fill(); // Залить обл. под кривой
    g.fillText("Общая сумма средств", 20, 35);
// Повторить цикл, как выше, но нарисовать график остатка по кредиту
    var bal = major;
    g.beginPath();
    g.moveTo(paymentToX(0), amountToY(bal));
    for (var p = 1; p <= payments; p++) {
        var thisMonthsInterest = bal * interest;
        bal -= (monthly - thisMonthsInterest); // Остаток погаш. по кредиту
        g.lineTo(paymentToX(p), amountToY(bal)); // Линию до этой точки
    }
    g.lineWidth = 3; // Жирная линия
    g.stroke(); // Нарисовать кривую графика
    g.fillStyle = "black";
    g.fillText("Остаток кредита", 20, 50); // Легенда
// Нарисовать отметки лет на оси X
    g.textAlign = "center"; // Текст меток по центру
    var y = amountToY(0); // Координата Y на оси X
    for (var year = 1; year * 12 <= payments; year++) { // Для каждого года
        var x = paymentToX(year * 12); // Вычислить позицию метки
        g.fillRect(x - 0.5, y - 3, 1, 3); // Нарисовать метку
        if (year == 1) g.fillText("Годы", x, y - 5); // Подписать ось
        if (year % 2 == 0 && year * 12 !== payments)
        // Числа через каждые 2 года
            g.fillText(String(year), x, y - 5);
        g.textAlign = "right"; // Текст по правому краю
        g.textBaseline = "middle"; // Центрировать по вертикали
        var ticks = [monthly*payments, principal]; // Вывести две суммы
        var rightEdge = paymentToX(payments); // Координата X на оси Y
        for(var i = 0; i < ticks.length; i++) { // Для каждой из 2 сумм
            var y = amountToY(ticks[i]); // Определяем координату Y
            g.fillRect(rightEdge-3, y-0.5, 3,1); // Рисуем метку и выводим рядом сумму.
            g.fillText(String(ticks[i].toFixed(0)),
                rightEdge-5, y);
    }
};
}