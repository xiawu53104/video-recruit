import { observable, action, runInAction, computed } from 'mobx';
import axios from '../service/axios';

class QuestionBankStore {
  @observable examList = [];
  @observable examName = '';
  @observable questionList = [];

  @computed get showQuestionList() {
    return !!this.questionList.length;
  }

  @action
  async fetchExamList({pageNum, pageSize, recordCount}) {
    const res = await this.api().getList({pageNum, pageSize, recordCount});
    runInAction(() => {
      const list = res.data && res.data.recordList || [];
      this.examList = list;
    })
  }

  @action
  async addExamPaper(name) {
    const res = await this.api().addExam(name);
    return res;
  }

  @action
  async deleteExamPaper(examPaperId) {
    await this.api().deleteExam(examPaperId);
  }

  @action
  async modifyExamPaper(id, name) {
    await this.api().editExam(id, name);
  }

  @action
  async fetchQuestionList(id) {
    const res = await this.api().getQuestionList(id);
    runInAction(() => {
      this.examName = res.data.name;
      this.questionList = res.data.examPaperDetailList || [];
    })
  }

  @action
  async doAddQuestion({ examPaperId, name, duration }) {
    return await this.api().addQuestion({ examPaperId, name, duration });
  }

  @action
  async doDeleteQuestion(examPaperDetailId) {
    return await this.api().deleteQuestion(examPaperDetailId);
  }

  @action
  async modifyQuestion({ examPaperDetailId, name, duration }) {
    return await this.api().editQuestion({ examPaperDetailId, name, duration });
  }

  @action
  async fetchQuestionDetail(quesId) {
    return await this.api().getQuestionDetail(quesId);
  }

  api() {
    return {
      getList({pageNum, pageSize, recordCount}) {
        return axios({
          url: `/interview/examPaper/getExamPaperListPage.do?pageNum=${pageNum}&pageSize=${pageSize}&recordCount=${recordCount}`
        });
      },
      addExam(name) {
        return axios({
          url: `/interview/examPaper/addExamPaper.do?name=${name}`
        });
      },
      deleteExam(examPaperId) {
        return axios({
          url: `/interview/examPaper/deleteExamPaper.do?examPaperId=${examPaperId}`
        })
      },
      editExam(id, name) {
        return axios({
          url: `/interview/examPaper/saveExamPaper.do?examPaperId=${id}&name=${name}`
        })
      },
      getQuestionList(examPaperId) {
        return axios({
          url: `/interview/examPaper/getExamPaper.do?examPaperId=${examPaperId}`
        })
      },
      addQuestion({ examPaperId, name, duration }) {
        return axios({
          url: `/interview/examPaper/addExamPaperDetail.do?examPaperId=${examPaperId}&name=${name}&duration=${duration}`,
        })
      },
      deleteQuestion(examPaperDetailId) {
        return axios({
          url: `/interview/examPaper/deleteExamPaperDetail.do?examPaperDetailId=${examPaperDetailId}`
        })
      },
      editQuestion({ examPaperDetailId, name, duration }) {
        return axios({
          url: `/interview/examPaper/saveExamPaperDetail.do?examPaperDetailId=${examPaperDetailId}&name=${name}&duration=${duration}`
        })
      },
      getQuestionDetail(examPaperDetailId) {
        return axios({
          url: `/interview/examPaper/getExamPaperDetail.do?examPaperDetailId=${examPaperDetailId}`
        })
      }
    }
  }
}

export default new QuestionBankStore();
