/*
 *  ATIVIDADE FINALIZADA
 *  Projeto orientado a objetos que visa demonstrar o funcionamento da troca de marchas
 *  de um veículo (caminhão) com um sistema de transmissão automático
 */

/**
 * Classe Veículo (genérica)
 * Representa as características presentes na maioria dos veículos
 */
class Vehicle {
    protected _km = 0;
    
    constructor(public model: string,public wheels: number,public axles: number,public capacity: number) {
    }
}

/**
 * Classe Caixa de câmbio
 * Representa as características e métodos tradicionais presentes nas caixas de câmbio
 */
class GearBox {
    protected readonly MAX_SHIFTS = 15 // Limite total de trocas para cada troca de óleo
    private _totalShifts = 0 // Contagem do total de trocas de marcha desde a última troca de óleo
    protected _gear = 0 // -1 = Ré e 0 = Neutro ... vai até o limite definido pela quantidade de marchas no construtor pelo parâmetro _gears
    protected _oilState: "new" | "good" | "bad" = "new" // Estado atual do óleo

    constructor(public model: string, private _gears: number) {}

    /**
     * Lógica de troca de marcha, se aplica a ambas as funções shift (passar) e unshift (voltar)
     * realiza as verificações referente as condições do óleo e atualiza o estado da instância
     * 
     */
    public shift(): void {
        if (!this._validGear(this._gear + 1)) return
        if (!this._shouldShift()) console.log("Lá se vão as engrenagens 💨")
        this._totalShifts++
        this._gear++
        this._updateOilState()
        console.log(`Subiu para a marcha ${this._gear} 🔺`)
    }

    /**
     * Lógica de troca de marcha, se aplica a ambas as funções shift (passar) e unshift (voltar)
     * realiza as verificações referente as condições do óleo e atualiza o estado da instância
     * 
     */
    public unshift(): void {
        if (!this._validGear(this._gear - 1)) return
        if (!this._shouldShift()) console.log("Lá se vão as engrenagens 💨")
        this._totalShifts++
        this._gear--
        this._updateOilState()
        console.log(`Reduziu para a marcha ${this._gear} 🔻`)
    }

    /**
     * Realiza a "troca de óleo" da caixa, resetando o estado da condição do óleo
     */
    public changeOil(): void {
        this._totalShifts = 0
        this._updateOilState()
        console.log("Óleo trocado!💧")
    }

    /**
     * Atualiza o estado do óleo baseado na quantidade de trocas totais
     */
    private _updateOilState():void {
        if (this._totalShifts > 10) {
            this._oilState = "bad"
            return
        }
        if (this._totalShifts > 5) {
            this._oilState = "good"
            return
        }
        this._oilState = "new"

    }

    /**
     * Verificação básica para garantir que não seja possível colocar uma marcha maior que o limite e menor que a ré
     */
    private _validGear(nextGear: number): boolean {
        return nextGear < this._gears || nextGear >= -1
    }

    /**
     * Verificação das condições do óleo na hora da troca
     * Entra em pânico caso a próxima troca ultrapasse o limite
     */
    private _shouldShift(): boolean {
        if (this._totalShifts > this.MAX_SHIFTS) throw 'TA PEGANU FOGO BIXO 💥💥'
        if (this._oilState === "bad") return false
        return true
    }

    /**
     * 
     * Retorna a marcha atualmente selecionada
     */
    public currentGear(): number {
        return this._gear
    }
}

/**
 * Classe Caminhão
 * Representa o caminhão final através da herança e da composição das outras classes
 * também representa a interface de um caminhão real já que abstrai algumas partes
 * do funcionamento interno
 */
class Truck extends Vehicle {

    protected _gearBox = new GearBox("gr905",12)

    constructor(model,wheels,axles, capacity) {
        super(model,wheels,axles,capacity);
        console.log(`🚛 ${model} de ${axles} eixos foi instanciado`)
    }

    /**
     * Chama o método de troca da caixa de marcha
     */
    public shift(): void {
        this._gearBox.shift()
    }
    /**
     * Chama o método de troca da caixa de marcha
     */
    public unshift(): void {
        this._gearBox.unshift()
    }

    /**
     * Exibe qual a marcha atual selecionada de forma mais amigável para ser exibida no painel
     */
    public displayCurrentGear() {
        const currentGear = this._gearBox.currentGear()
        switch(currentGear) {
            case -1:
                console.log("R")
                break
            case 0:
                console.log("N")
                break
            default:
                console.log(currentGear)
        }
    }

    /**
     * Fornece uma ponte para que um módulo externo consiga se acoplar no caminhão e ter acesso
     * as informações da caixa de marcha
     */
    public accessGearBox(): GearBox {
        return this._gearBox
    }
}

/**
 * Exemplo de uso
 */
const truck = new Truck("Scania", 6,3,2) // 🚛 Scania de 3 eixos foi instanciado
truck.shift() // Subiu para a marcha 1
truck.shift() // Subiu para a marcha 2
truck.shift() // Subiu para a marcha 3
truck.shift() // Subiu para a marcha 4
truck.shift() // Subiu para a marcha 5
truck.unshift() // Reduziu para a marcha 4 
truck.unshift() // Reduziu para a marcha 3
truck.shift() // Subiu para a marcha 4
truck.shift() // Subiu para a marcha 5
truck.unshift // Reduziu para a marcha 4
truck.unshift() // Reduziu para a marcha 3
// Lá se vão as engrenagens 💨
truck.unshift() // Reduziu para a marcha 2
// Lá se vão as engrenagens 💨
truck.unshift() // Reduziu para a marcha 1
// Lá se vão as engrenagens 💨
truck.shift() // Subiu para a marcha 2
// Lá se vão as engrenagens 💨
truck.shift() // Subiu para a marcha 3
// Lá se vão as engrenagens 💨
truck.shift() // Subiu para a marcha 4
// Lá se vão as engrenagens 💨
truck.unshift() // Reduziu para a marcha 3 
// Lá se vão as engrenagens 💨
truck.unshift() // Reduziu para a marcha 2
// Lá se vão as engrenagens 💨
truck.unshift() // Reduziu para a marcha 1
// 'TA PEGANU FOGO BIXO 💥💥'