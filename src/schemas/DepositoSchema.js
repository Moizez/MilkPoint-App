export default class DepositoSchema {
  static schema = {
    name: 'Deposito',
    id: 'int',
    properties: {
      id: { type: 'string', indexed: true },
      idProd: 'int',
      idTanque: 'int',
      quantidade: 'float',
    }
  }
}
