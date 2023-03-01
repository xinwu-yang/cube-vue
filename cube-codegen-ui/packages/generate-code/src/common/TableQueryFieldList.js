export default `<% for (let item of tableQueryFieldList) { %>-%>
        <% if (item.component.name === 'NUMBER') { %>-%>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <a-input-number placeholder="请输入<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'STRING') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <a-input placeholder="请输入<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>"></a-input>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label %>">
              <a-select placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" style="width: 100%">
                <a-select-option value="1">选项一</a-select-option>
                <a-select-option value="2">选项二</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'TREE_SELECT') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label %>">
              <j-tree-select
                ref="treeSelect"
                placeholder="<%= item.label || item.name %>"
                v-model="queryParam.<%= item.name %>"-%>
                <% if (item.component.params.dictCode) { %>
                dict="<%= item.component.params.dictCode %>"-%>
                <% } %>-%>
                <% if (item.component.params.pidField) { %>
                pidField="<%= item.component.params.pidField %>"-%>
                <% } %>-%>
                <% if (item.component.params.hasChildField) { %>
                hasChildField="<%= item.component.params.hasChildField %>"-%>
                <% } %>
                pidValue="<%= item.component.params.pidValue %>"
              >
              </j-tree-select>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'CATEGORY_SELECT') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label %>">
              <j-area-linkage type="cascader" v-model="queryParam.<%= item.name %>" placeholder="请选择省市区" />
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'AREA_LINKAGE') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label %>">
              <j-area-linkage type="cascader" v-model="queryParam.<%= item.name %>" placeholder="请选择省市区" />
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'POPUP') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<% item.label %>">
              <j-popup placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" code="<%= item.component.params ? item.component.params.dictTable : '' %>" org-fields="<%= item.component.params ? item.component.params.dictField : '' %>" dest-fields="<%= item.component.params ? item.component.params.dictText : '' %>" :field="getPopupField('<%= item.component.params ? item.component.params.dictText : '' %>')"/>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'DATE_BETWEEN') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <a-range-picker style="width: 100%" format="YYYY-MM-DD HH:mm:ss" v-model="queryParam.<%= item.name %>" :placeholder="['开始时间', '结束时间']" @change="(dates, dateString) => (queryParam.<%= item.name %> = dateString)"/>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'DATE') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <a-date-picker style="width: 100%" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" @change="(dates, dateString) => (queryParam.<%= item.name %> = dateString)" />
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT_USER_BY_DEPART') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-select-user-by-dep v-model="queryParam.<%= item.name %>"></j-select-user-by-dep>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT_ROLE') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-select-role v-model="queryParam.<%= item.name %>"></j-select-role>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT_POSITION') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-select-position v-model="queryParam.<%= item.name %>"></j-select-position>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT_MULTI_USER') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-select-multi-user v-model="queryParam.<%= item.name %>"></j-select-multi-user>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SELECT_DEPART') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-select-depart v-model="queryParam.<%= item.name %>"></j-select-depart>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'DICT_SELECT_TAG') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-dict-select-tag placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" dictCode="<%= item.component.params.dictCode %>"></j-dict-select-tag>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'SEARCH_SELECT_TAG') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-search-select-tag placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" dict="<%= item.component.params.dictCode %>" :async="true"></j-search-select-tag>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'MULTI_SELECT_TAG') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <j-multi-select-tag placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" dictCode="<%= item.component.params.dictCode %>"></j-multi-select-tag>
            </a-form-item>
          </a-col>-%>
        <% } else if (item.component.name === 'ENUM_SELECT') { %>
          <a-col :xl="6" :md="8" :sm="24">
            <a-form-item label="<%= item.label || item.name %>">
              <cube-select-enum placeholder="请选择<%= item.label || item.name %>" v-model="queryParam.<%= item.name %>" enum="<%= item.component.params.classPath %>"></cube-select-enum>
            </a-form-item>
          </a-col>
        <% } %>-%>
      <% } %>`
