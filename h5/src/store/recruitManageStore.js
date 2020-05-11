import { observable, action, runInAction, computed } from 'mobx';
import axios from '../service/axios';

class RecruitManageStroe {
  @observable recruitList = [];
  @observable examList = [];

  @action
  async fetchRecruitList({pageNum, pageSize, recordCount}) {
    const res = await this.api().getRecruitList({pageNum, pageSize, recordCount});
    runInAction(() => {
      console.log(res)
      const list = res.data && res.data.recordList || [];
      this.recruitList = list;
    })
  }

  @action
  async fetchExamList({pageNum, pageSize, recordCount}) {
    const res = await this.api().getExamList({pageNum, pageSize, recordCount});
    runInAction(() => {
      const list = res.data && res.data.recordList || [];
      this.examList = list.map(item => ({
        label: item.name,
        value: item.id
      }));
    })
  }

  @action
  async fetchAiCode(data) {
    const res = await this.api().getAiInviteCode(data);
    return res;
  }

  api() {
    return {
      getRecruitList({pageNum, pageSize, recordCount}) {
        return axios({
          url: `/interview/examPaper/getExamPaperListPage.do?pageNum=${pageNum}&pageSize=${pageSize}&recordCount=${recordCount}`
        })
      },
      getExamList({pageNum, pageSize, recordCount}) {
        return axios({
          url: `/interview/examPaper/getExamPaperListPage.do?pageNum=${pageNum}&pageSize=${pageSize}&recordCount=${recordCount}`
        });
      },
      getAiInviteCode(data) {
        const querys = [];
        Object.keys(data).forEach(key => {
          querys.push(`${key}=${data[key]}`);
        })
        return axios({
          url: `/interview/interviewRecord/aiInvite.do?` + querys.join('&')
        })
      }
    }
  }
}

export default new RecruitManageStroe();
