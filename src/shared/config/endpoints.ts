export const endpoints = {
  users: {
    login: "/users/login",
    logout: "/users/logout",
    refresh: "/users/refresh",
    role: (email: string) => `/users/role?email=${email}`,
    contractors: "/users/contractors",
    current: "/users/current",
  },
  company: {
    current: "/company/current",
    getStatus: (companyId: string) => `/company/dashboard/status/${companyId}`
  },
  materials: {
    llm: "/materials/llm",
    add: (objectId: string, categoryId: string) => `/materials/add/${objectId}?category_id=${categoryId}`,
    detail: (objectId: string, categoryId: string) => `/materials/list/detail/${objectId}/${categoryId}`,
    getList: "/materials/list"
  },
  nfc: {
    add: (objectId: string) => `/nfc/add/${objectId}`,
    all: (objectId: string) => `/nfc/all/${objectId}`,
    delete: (nfcId: string) => `/nfc/delete/${nfcId}`,
    getHistory: (objectId: string) => `/nfc/history/${objectId}`,
    getHistoryAll: `/nfc/history`,
    verify: (objectId: string) => `/nfc/verify/${objectId}`,
    falsification: (objectId: string) => `/nfc/session/${objectId}`
  },
  objects: {
    actChange: (objectId: string, action: "accept"| "deny") => `/objects/act/change/${objectId}?action=${action}`,
    activateCheckList: (objectId: string) => `/objects/activate/checkList/${objectId}`,
    filterAll: (companyId: string) => `/objects/all/all/${companyId}`,
    allCategories: `/objects/categories`,
    countFilter: (companyId: string, filterBy: string) => `/objects/count/${filterBy}/${companyId}`,
    createObject: (companyId: string) => `/objects/create/${companyId}`,
    sendFileActivate: (objectId: string) => `/objects/send/file/${objectId}`,
    get: (objectId: string) => `/objects/${objectId}`,
    getCheckList: (objectId: string) => `/objects/checkList/${objectId}`
  },
  remarks: {
    answer: (objectId: string, remarkId: string) => `/remarks/answer/${remarkId}/${objectId}`,
    getAll: (objectId: string) => `/remarks/all/${objectId}`,
    changeStatus: (remarkId: string) => `/remarks/change/status/${remarkId}`,
    create: (objectId: string) => `/remarks/create/${objectId}`,
    detail: (remarkId: string) => `/remarks/detail/${remarkId}`,
  },
  violations: {
    answer: (objectId: string, remarkId: string) => `/violations/answer/${remarkId}/${objectId}`,
    getAll: (objectId: string) => `/violations/all/${objectId}`,
    changeStatus: (remarkId: string) => `/violations/change/status/${remarkId}`,
    create: (objectId: string) => `/violations/create/${objectId}`,
    detail: (remarkId: string) => `/violations/detail/${remarkId}`,
  }
}