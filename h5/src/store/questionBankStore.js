import { observable, action, runInAction } from 'mobx';
import axios from '../service/axios';

class QuestionBankStore {
  @observable examList = [];

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
      }
    }
  }
}

export default new QuestionBankStore();
