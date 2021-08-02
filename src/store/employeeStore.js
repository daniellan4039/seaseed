export default {
    state: {
        employee: null,
        certification: null,
        professional: null,
        family: null,
        education: null,
        resume: null,
        archive: null,
        reward: null,
        contract: null,
        language: null,
        patent: null,
        train: null,
        research: null,
        thesis: null,
        soldier: null,
        distribute: null,
        position: null,
        archiveRoom: null,
        archiveBorrow: null,
        archiveTransfer: null,
        dictionary: null,
        parentDictionary: null,
        academic: null,
        transferRecord: null
    },
    mutations: {
        setEmployee (state, info) {
            state.employee = info
        },
        setCertification(state, info) {
            state.certification = info
        },
        setProfessional(state, info) {
            state.professional = info
        },
        setFamily(state, info) {
            state.family = info
        },
        setEducation(state, info) {
            state.education = info
        },
        setResume(state, info) {
            state.resume = info
        },
        setArchive(state, info) {
            state.archive = info
        },
        setReward(state, info) {
            state.reward = info
        },
        setContract(state, info) {
            state.contract = info
        },
        setLanguage(state, info) {
            state.language = info
        },
        setPatent(state, info) {
            state.patent = info
        },
        setTrain(state, info) {
            state.train = info
        },
        setResearch(state, info) {
            state.research = info
        },
        setThesis(state, info) {
            state.thesis = info
        },
        setSoldier(state, info) {
            state.soldier = info
        },
        setDistribute(state, info) {
            state.distribute = info
        },
        setPosition(state, info) {
            state.position = info
        },
        setArchiveRoom(state, info) {
            state.archiveRoom = info
        },
        setArchiveBorrow(state, info) {
            state.archiveBorrow = info
        },
        setArchiveTransfer(state, info) {
            state.archiveTransfer = info
        },
        setDictionary(state, info) {
            state.dictionary = info
        },
        setParentDictionary(state, info) {
            state.parentDictionary = info
        },
        setAcademic(state, info) {
            state.academic = info
        },
        setTransferRecord(state, info) {
            state.transferRecord = info
        }
    },
    actions: {
        setEmployee (context, info) {
            context.commit('setEmployee', info)
        },
        setCertification(context, info) {
            context.commit('setCertification', info)
        },
        setProfessional(context, info) {
            context.commit('setProfessional', info)
        },
        setFamily(context, info) {
            context.commit('setFamily', info)
        },
        setEducation(context, info) {
            context.commit('setEducation', info)
        },
        setResume(context, info) {
            context.commit('setResume', info)
        },
        setArchive(context, info) {
            context.commit('setArchive', info)
        },
        setReward(context, info) {
            context.commit('setReward', info)
        },
        setContract(context, info) {
            context.commit('setContract', info)
        },
        setLanguage(context, info) {
            context.commit('setLanguage', info)
        },
        setPatent(context, info) {
            context.commit('setPatent', info)
        },
        setTrain(context, info) {
            context.commit('setTrain', info)
        },
        setResearch(context, info) {
            context.commit('setResearch', info)
        },
        setThesis(context, info) {
            context.commit('setThesis', info)
        },
        setSoldier(context, info) {
            context.commit('setSoldier', info)
        },
        setDistribute(context, info) {
            context.commit('setDistribute', info)
        },
        setPosition(context, info) {
            context.commit('setPosition', info)
        },
        setArchiveRoom(context, info) {
            context.commit('setArchiveRoom', info)
        },
        setArchiveBorrow(context, info) {
            context.commit('setArchiveBorrow', info)
        },
        setArchiveTransfer(context, info) {
            context.commit('setArchiveTransfer', info)
        },
        setDictionary(context, info) {
            context.commit('setDictionary', info)
        },
        setParentDictionary(context, info) {
            context.commit('setParentDictionary', info)
        },
        setAcademic(context, info) {
            context.commit('setAcademic', info)
        },
        setTransferRecord(context, info) {
            context.commit('setTransferRecord', info)
        }
    }
}
