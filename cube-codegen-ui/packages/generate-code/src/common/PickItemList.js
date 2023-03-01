export default `<% for (let item of formList) { %><% if (item.items) { %><% for (let i = 0; i < item.items.length; i++) { %>-%>, '<%= item.items[i].dataIndex %>'<% } %>-%><% } %><% } %>`
