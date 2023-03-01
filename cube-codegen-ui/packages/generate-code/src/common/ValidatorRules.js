export default `<% for (let item of formList) { %>-%>
          <% if (item.items) { %>-%>
            <% for (let itm of item.items) { %>-%>
              <% if (itm.component && itm.component.name === 'NUMBER') { %>
          <%= itm.dataIndex %>: {
            rules: [{ required: true, message: '<%= itm.title %>不能为空' }, { pattern: /^[\\d]*$/, message: '只能输入数字' }]
          },-%>
              <% } else { %>
          <%= itm.dataIndex %>: {
            rules: [{ required: true, message: '<%= itm.title %>不能为空' }]
          },-%>
              <% } %>-%>
            <% } %>-%>
          <% } %>-%>
        <% } %>`
