import CPF from 'cpf'

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem))
}

const normalize = function(data) {
  data.forEach((d) => {
    var data = d.dataInclusao
    if (d.dataInclusao[2] !== '/') {
      data = data.splice(2, 0, '/')
    }
    if (d.dataInclusao[4] !== '/' && d.dataInclusao[5] !== '/') {
      data = data.splice(5, 0, '/')
    }
    d.dataInclusao = data
    if (CPF.isValid(d.cpf)) {
      d.cpf = CPF.format(d.cpf)
    }
  })

  return data
}
export default normalize
