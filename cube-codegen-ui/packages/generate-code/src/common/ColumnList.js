export default `<% for (let item of tableList) { %>
          {
            title: '<%= item.title %>',
            align: 'center',
            dataIndex: '<%= item.component && item.component.params && item.component.params.dictCode ? item.dataIndex + '_dictText': item.dataIndex %>',-%>
            <% if (item.component.name === 'DATE') { %>
            customRender: function (text) {
              return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
            }-%>
            <% } else if (item.component.name === 'AREA_LINKAGE') { %>
            scopedSlots: {customRender: 'pcaSlot'}-%>
            <% } else if (item.component.name === 'EDITOR') { %>
            scopedSlots: {customRender: 'htmlSlot'}-%>
            <% } else if (item.component.name === 'FILE') { %>
            scopedSlots: {customRender: 'fileSlot'}-%>
            <% } else if (item.component.name === 'IMAGE') { %>
            scopedSlots: {customRender: 'imgSlot'}-%>
            <% } else if (item.component.name === 'CATEGORY_SELECT' && item.component.params) { %>
              customRender: (text, record) => (text ? record['<%= item.component.params.dictCode %>'] : '')-%>
            <% } else if (item.component.name === 'CATEGORY_SELECT' && !item.component.params) { %>
            customRender: (text) => (text ? filterMultiDictText(this.dictOptions['<%= item.dataIndex %>'], text) : '')-%>
            <% } else if (item.component.name === 'SWITCH' && item.dictField.length) { %>
            customRender: (text) => (!text ? '' : (text === <%= item.component.params ? item.component.params.dictField : '' %>[0] ? '是' : '否'))-%>
            <% } else if (item.component.name === 'SWITCH' && !item.dictField) { %>
            customRender: (text) => (!text ? '' : (text === 'Y' ? '是' : '否'))-%>
            <% } %>
          },-%>
          <% } %>`
