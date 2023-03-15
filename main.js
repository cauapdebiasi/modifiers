/*
 *  ATIVIDADE FINALIZADA
 *  Projeto orientado a objetos que visa demonstrar o funcionamento da troca de marchas
 *  de um veículo (caminhão) com um sistema de transmissão automático
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Classe Veículo (genérica)
 * Representa as características presentes na maioria dos veículos
 */
var Vehicle = /** @class */ (function () {
    function Vehicle(model, wheels, axles, capacity) {
        this.model = model;
        this.wheels = wheels;
        this.axles = axles;
        this.capacity = capacity;
        this._km = 0;
    }
    return Vehicle;
}());
/**
 * Classe Caixa de câmbio
 * Representa as características e métodos tradicionais presentes nas caixas de câmbio
 */
var GearBox = /** @class */ (function () {
    function GearBox(model, _gears) {
        this.model = model;
        this._gears = _gears;
        this.MAX_SHIFTS = 15; // Limite total de trocas para cada troca de óleo
        this._totalShifts = 0; // Contagem do total de trocas de marcha desde a última troca de óleo
        this._gear = 0; // -1 = Ré e 0 = Neutro ... vai até o limite definido pela quantidade de marchas no construtor pelo parâmetro _gears
        this._oilState = "new"; // Estado atual do óleo
    }
    /**
     * Lógica de troca de marcha, se aplica a ambas as funções shift (passar) e unshift (voltar)
     * realiza as verificações referente as condições do óleo e atualiza o estado da instância
     *
     */
    GearBox.prototype.shift = function () {
        if (!this._validGear(this._gear + 1))
            return;
        if (!this._shouldShift())
            console.log("Lá se vão as engrenagens 💨");
        this._totalShifts++;
        this._gear++;
        this._updateOilState();
        console.log("Subiu para a marcha ".concat(this._gear, " \uD83D\uDD3A"));
    };
    /**
     * Lógica de troca de marcha, se aplica a ambas as funções shift (passar) e unshift (voltar)
     * realiza as verificações referente as condições do óleo e atualiza o estado da instância
     *
     */
    GearBox.prototype.unshift = function () {
        if (!this._validGear(this._gear - 1))
            return;
        if (!this._shouldShift())
            console.log("Lá se vão as engrenagens 💨");
        this._totalShifts++;
        this._gear--;
        this._updateOilState();
        console.log("Reduziu para a marcha ".concat(this._gear, " \uD83D\uDD3B"));
    };
    /**
     * Realiza a "troca de óleo" da caixa, resetando o estado da condição do óleo
     */
    GearBox.prototype.changeOil = function () {
        this._totalShifts = 0;
        this._updateOilState();
        console.log("Óleo trocado!💧");
    };
    /**
     * Atualiza o estado do óleo baseado na quantidade de trocas totais
     */
    GearBox.prototype._updateOilState = function () {
        if (this._totalShifts > 10) {
            this._oilState = "bad";
            return;
        }
        if (this._totalShifts > 5) {
            this._oilState = "good";
            return;
        }
        this._oilState = "new";
    };
    /**
     * Verificação básica para garantir que não seja possível colocar uma marcha maior que o limite e menor que a ré
     */
    GearBox.prototype._validGear = function (nextGear) {
        return nextGear < this._gears || nextGear >= -1;
    };
    /**
     * Verificação das condições do óleo na hora da troca
     * Entra em pânico caso a próxima troca ultrapasse o limite
     */
    GearBox.prototype._shouldShift = function () {
        if (this._totalShifts > this.MAX_SHIFTS)
            throw 'TA PEGANU FOGO BIXO 💥💥';
        if (this._oilState === "bad")
            return false;
        return true;
    };
    /**
     *
     * Retorna a marcha atualmente selecionada
     */
    GearBox.prototype.currentGear = function () {
        return this._gear;
    };
    return GearBox;
}());
/**
 * Classe Caminhão
 * Representa o caminhão final através da herança e da composição das outras classes
 * também representa a interface de um caminhão real já que abstrai algumas partes
 * do funcionamento interno
 */
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(model, wheels, axles, capacity) {
        var _this = _super.call(this, model, wheels, axles, capacity) || this;
        _this._gearBox = new GearBox("gr905", 12);
        console.log("\uD83D\uDE9B ".concat(model, " de ").concat(axles, " eixos foi instanciado"));
        return _this;
    }
    /**
     * Chama o método de troca da caixa de marcha
     */
    Truck.prototype.shift = function () {
        this._gearBox.shift();
    };
    /**
     * Chama o método de troca da caixa de marcha
     */
    Truck.prototype.unshift = function () {
        this._gearBox.unshift();
    };
    /**
     * Exibe qual a marcha atual selecionada de forma mais amigável para ser exibida no painel
     */
    Truck.prototype.displayCurrentGear = function () {
        var currentGear = this._gearBox.currentGear();
        switch (currentGear) {
            case -1:
                console.log("R");
                break;
            case 0:
                console.log("N");
                break;
            default:
                console.log(currentGear);
        }
    };
    /**
     * Fornece uma ponte para que um módulo externo consiga se acoplar no caminhão e ter acesso
     * as informações da caixa de marcha
     */
    Truck.prototype.accessGearBox = function () {
        return this._gearBox;
    };
    return Truck;
}(Vehicle));
/**
 * Exemplo de uso
 */
var truck = new Truck("Scania", 6, 3, 2); // 🚛 Scania de 3 eixos foi instanciado
truck.shift(); // Subiu para a marcha 1
truck.shift(); // Subiu para a marcha 2
truck.shift(); // Subiu para a marcha 3
truck.shift(); // Subiu para a marcha 4
truck.shift(); // Subiu para a marcha 5
truck.unshift(); // Reduziu para a marcha 4 
truck.unshift(); // Reduziu para a marcha 3
truck.shift(); // Subiu para a marcha 4
truck.shift(); // Subiu para a marcha 5
truck.unshift; // Reduziu para a marcha 4
truck.unshift(); // Reduziu para a marcha 3
// Lá se vão as engrenagens 💨
truck.unshift(); // Reduziu para a marcha 2
// Lá se vão as engrenagens 💨
truck.unshift(); // Reduziu para a marcha 1
// Lá se vão as engrenagens 💨
truck.shift(); // Subiu para a marcha 2
// Lá se vão as engrenagens 💨
truck.shift(); // Subiu para a marcha 3
// Lá se vão as engrenagens 💨
truck.shift(); // Subiu para a marcha 4
// Lá se vão as engrenagens 💨
truck.unshift(); // Reduziu para a marcha 3 
// Lá se vão as engrenagens 💨
truck.unshift(); // Reduziu para a marcha 2
// Lá se vão as engrenagens 💨
truck.unshift(); // Reduziu para a marcha 1
// 'TA PEGANU FOGO BIXO 💥💥'
