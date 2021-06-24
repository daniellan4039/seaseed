import axios from "axios";
import * as employeeApi from './employeeApi'
import * as dictionaryApi from './dictionaryApi'
import * as userApi from './userApi'
import * as departmentApi from './departmentApi'
import * as certificationApi from './certificationApi'
import * as professionalApi from './professionalApi'
import * as familyApi from './familyApi'
import * as educationApi from './educationApi'
import * as resumeApi from './resumeApi'
import * as archiveApi from './archiveApi'
import * as soldierApi from './soldierApi'
import * as thesisApi from './thesisApi'
import * as researchApi from './researchApi'
import * as trainApi from './trainApi'
import * as rewardApi from './rewardApi'
import * as contractApi from './contractApi'
import * as languageApi from './languageApi'
import * as patentApi from './patentApi'
import * as positionApi from './positionApi'
import * as archiveRoomApi from './archiveRoomApi'
import * as archiveBorrowApi from './archiveBorrowApi'
import * as archiveTransferApi from './archiveTransferApi'
import * as companyApi from './companyApi'

const $ = axios.create({
    baseURL: '/api',
    timeout: 1000
})

$.interceptors.request.use((config) => {
    config.headers = {
        token: `Bearer ${localStorage.getItem('HRMS_USER_TOKEN')}`,
        app_id: '68816749155319814',
        grayversion: process.env.NODE_ENV === 'development' ? 'dev' : ''
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

$.interceptors.response.use((response) => {
    return response.data
}, (error => {
    return Promise.reject(error)
}))

export {
    $,
    axios,
    employeeApi,
    dictionaryApi,
    userApi,
    departmentApi,
    certificationApi,
    professionalApi,
    familyApi,
    educationApi,
    resumeApi,
    archiveApi,
    soldierApi,
    thesisApi,
    researchApi,
    trainApi,
    rewardApi,
    contractApi,
    languageApi,
    patentApi,
    positionApi,
    archiveRoomApi,
    archiveBorrowApi,
    archiveTransferApi,
    companyApi
}
