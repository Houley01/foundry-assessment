const { v4 } = require('uuid')

class CRUDController {
  constructor() {
    this.rows = []
  }
  getOne(id) {
    return this.rows.find((item) => item.id === id.trim())
  }
  getAll() {
    return this.rows
  }
  delete(id) {
    const target = this.getOne(id)
    if(!target || target.length == 0) return {error: `ID ${id} not found`};
    this.rows = this.rows
      .filter(item => item.id !== id)
    return { deleted: id }
  }

  create(name) {
    const created = {
      id: v4(),
      name
    }
    this.rows.push(created)
    return created
  }
  update(id, name) {
    const target = this.getOne(id)
    if(!target || target.length == 0) return {error: `ID ${id} not found`};
    const index = this.rows.findIndex(r => r.id === id)
    this.rows[index].name = !!name ? name : this.rows[index].name
    return { updated: id }
  }
}
class ClientEmployeeController extends CRUDController {
  constructor(engagementController, type) {
    super()
    this.engagementService = engagementController
    this.type = type
  }
  getEngagements(id) {
    return this.engagementService.getBy(this.type, id)
  }
}

class EngagementController extends CRUDController {
  constructor() {
    super()
  }
  create(name, client, employee, description = '') {
    const startDate = new Date().toISOString()
    const id = v4()
    const created = {
      id, name, client, employee, started: startDate, description
    }
    this.rows.push(created)
    return created
  }
  update(id, name = '', description = ''){
    const target = this.getOne(id)
    if(!target || target.length == 0) return {error: `ID ${id} not found`};
    this.rows = this.rows
      .map(item => {
        return item.id === id
          ? { ...item,
            ...!!name ? { name } : {},
            ...!!description ? { description } : {}
          }
          : item
      })
    return { updated: id }
  }
  end(id) {
    const target = this.getOne(id)
    if(!target || target.length == 0) return {error: `ID ${id} not found`};
    if(!!target.ended) return { updated: id };
    this.rows = this.rows
      .map(item => {
        return item.id === id
          ? { ...item, ended: new Date().toISOString() }
          : item
      })
    return { updated: id }
  }
  getBy(type, id) {
    return this.rows.filter(item => item[type] === id)
  }
}

const engagementService = new EngagementController()
const clientService = new ClientEmployeeController(engagementService, 'client')
const employeeService = new ClientEmployeeController(engagementService, 'employee')

const bob = employeeService.create('Bob')
employeeService.create('Alice')
employeeService.create('Charlie')
employeeService.create('Steve')
employeeService.create('John')
employeeService.create('Jade')
employeeService.create('Kim')
employeeService.create('BeetleJuice')
employeeService.create('Death')
employeeService.create('House')
employeeService.create('Employee')

const acme = clientService.create('ACME')
clientService.create('BOCO')
clientService.create('upside world')
clientService.create('Client')
clientService.create('No Way home')
clientService.create('Little Shop')
clientService.create('Marvel')
clientService.create('CASE')

const bobAcmeEngagement = engagementService.create('DOING STUFF', acme.id, bob.id)
engagementService.create('aaa', acme.id, bob.id, 'GDAY')
engagementService.create('bbb', acme.id, bob.id, 'Hello')
engagementService.create('ccc', acme.id, bob.id, 'King')
engagementService.create('ddd', acme.id, bob.id, 'Queen')
engagementService.create('eee', acme.id, bob.id, 'ALPHA')


module.exports = {
  engagementService,
  clientService,
  employeeService
}


