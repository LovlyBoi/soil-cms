import { zwRequest } from '..'

// 请求建议值总数
export function getTotalSuggest() {
  return zwRequest.request({
    method: 'GET',
    url: '/suggestValues/total',
  })
}

// 请求某一页的建议值
export function getSuggestData(pageNum, pageSize) {
  return zwRequest.request({
    method: 'GET',
    url: '/suggestValues/getByLimit',
    params: {
      page: pageNum,
      size: pageSize
    },
    showLoading: true
  })
}

// 修改建议值
export function alterSuggestValue(newValue) {
  return zwRequest.request({
    method: 'POST',
    url: '/suggestValues/update',
    data: {
      result: '' + newValue.result ?? '',
			min_value: '' + newValue.min_value ?? '',
			cropName: newValue.cropName ?? '',
			id: '' + newValue.id ?? '',
			name_element: '' + newValue.name_element ?? '',
			max_value: '' + newValue.max_value ?? ''
    },
    showLoading: true
  })
}

// 删除建议值
export function deleteSuggestValue(id) {
  return zwRequest.request({
    method: 'POST',
    url: '/suggestValues/delete',
    data: {
      id: '' + id
    },
    showLoading: true
  })
}

// 添加建议值
export function addSuggestValue(newValue) {
  return zwRequest.request({
    method: 'POST',
    url: '/suggestValues/insert',
    data: {
      result: '' + newValue.result ?? '',
			min_value: '' + newValue.min_value ?? '',
			cropName: newValue.cropName ?? '',
			name_element: '' + newValue.name_element ?? '',
			max_value: '' + newValue.max_value ?? ''
    },
    showLoading: true
  })
}