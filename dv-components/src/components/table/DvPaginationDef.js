export default class PaginationDef {
  extra = {}
  model = {}
  order = 'descend'
  sort = 'id'

  pagination = {
    current: 1,
    pageSize: 20,
    total: 0
  }

  dataSource = []

  constructor(model) {
    this.model = model ?? {}
  }

  static fromModel(model) {
    return new PaginationDef(model)
  }

  setModel(model) {
    this.model = model
  }

  setPagination(current = 1, pageSize = 20){
    this.pagination = {
      current: current,
      pageSize: pageSize
    }
  }

  response(page) {
    this.pagination = {
      current: page.current,
      pageSize: page.size,
      total: page.total
    }
    const records = [...page.records]
    records.forEach((r, index) => {
      let raw = { ...r }
      const echoMap = r.echoMap
      delete raw.echoMap
      r._raw = raw
      if(echoMap) {
        for (const echoMapKey in echoMap) {
          r[echoMapKey] = echoMap[echoMapKey]
        }
      }
      r.key = index
      r.index = this.pagination.pageSize * this.pagination.current + index + 1
    })
    this.dataSource = records
  }

  get params() {
    return {
      current: this.pagination.current,
      extra: this.extra,
      order: this.order,
      size: this.pagination.pageSize,
      sort: this.sort,
      model: this.model
    }
  }
}