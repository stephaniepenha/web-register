import isValidDate from 'is-valid-date'
import validator from 'validator'
import CPF from 'cpf'

String.prototype.replaceAll = function(searchStr, replaceStr) {
  var str = this
  searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  return str.replace(new RegExp(searchStr, 'gi'), replaceStr)
}

export default function(data) {
  var cpf = CPF.isValid(data.cpf)
  var valor = validator.isDecimal(data.valordivida, { force_decimal: false, decimal_digits: '2' })
  var contrato = validator.isInt(data.numeroContrato, { max: 99999 }) // 5 digitos de 0 a 9
  var date = isValidDate(data.dataInclusao) // 00/00/00
  var name = data.nome !== '' || data.nome !== undefined || data.nome !== null

  return [
    cpf && valor && contrato && date && name,
    {
      cpf: cpf,
      valordivida: valor,
      numeroContrato: contrato,
      dataInclusao: date,
      nome: name,
    },
    {
      cpf: data.cpf.replaceAll('.', '').replaceAll('-', ''),
      valordivida: parseFloat(data.valordivida.replaceAll(',', '.')),
      numeroContrato: parseInt(data.numeroContrato),
      dataInclusao: data.dataInclusao,
      nome: data.nome,
    },
  ]
}
