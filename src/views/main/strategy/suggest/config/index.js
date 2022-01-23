const suggestTableConfig = [
  {
    prop: 'id',
    label: 'ID',
    minWidth: 150
  },
  {
    prop: 'cropName',
    label: '作物名',
    minWidth: 150
  },
  {
    prop: 'nameElement',
    label: '元素名',
    minWidth: 150
  },
  {
    prop: 'min_value',
    label: '最小值',
    minWidth: 150
  },
  {
    prop: 'max_value',
    label: '最大值',
    minWidth: 150
  },
  {
    prop: 'result',
    label: '结果',
    minWidth: 150
  },
]


const dialogFormRules = {
  min_value: [
    {
      pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
      message: '输入格式不正确',
      trigger: 'blur'
    }
  ],
  max_value: [
    {
      pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
      message: '输入格式不正确',
      trigger: 'blur'
    }
  ],
  result: [
    {
      pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
      message: '输入格式不正确',
      trigger: 'blur'
    }
  ],
}

const alterDialogConfig = {
  formItems: [
    {
      prop: 'id',
      label: 'ID',
      disabled: true
    },
    {
      prop: 'cropName',
      label: '作物名',
      disabled: true
    },
    {
      prop: 'nameElement',
      label: '元素名',
      disabled: true
    },
    {
      prop: 'min_value',
      label: '最小值',
    },
    {
      prop: 'max_value',
      label: '最大值',
    },
    {
      prop: 'result',
      label: '结果',
    },
  ],
  rules: dialogFormRules,
}

const addDialogConfig = {
  formItems: [
    {
      prop: 'cropName',
      label: '作物名',
      select: true,
      placeholder: '请选择作物',
      options: [
        {
          label: '大豆',
          value: '大豆'
        },
        {
          label: '玉米',
          value: '玉米'
        },
        {
          label: '香瓜',
          value: '香瓜'
        },
        {
          label: '糯玉米',
          value: '糯玉米'
        },
      ],
    },
    {
      prop: 'name_element',
      label: '元素名',
      select: true,
      placeholder: '请选择元素名',
      options: [
        {
          label: '有效磷',
          value: 'Olsen_P'
        },
        {
          label: '速效钾',
          value: 'Olsen_K'
        },
        {
          label: '碱解氮',
          value: 'Effective_N'
        },
      ],
    },
    {
      prop: 'min_value',
      label: '最小值',
    },
    {
      prop: 'max_value',
      label: '最大值',
    },
    {
      prop: 'result',
      label: '结果',
    },
  ],
  rules: dialogFormRules,
}

export {
  suggestTableConfig,
  dialogFormRules,
  alterDialogConfig,
  addDialogConfig
}