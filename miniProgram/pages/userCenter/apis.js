const { Ajax } = require('../../utils/service.js');

exports.getRecruitList = function () {
  return new Promise((resolve, reject) => {
    Ajax({
      url: `/app/interviewRecord/getInviteListPage.do`,
      data: {
        pageNum: 1,
        pageSize: 999,
        recordCount: 0
      }
    }).then(res => {
      resolve(res.data);
    })
  })
}
