export default `<% for (let item of formList) { %>-%>
        <% if (item.items) { %>-%>
          <% if (grouped) { %>
        <a-divider orientation="left"><%= item.group %></a-divider>-%>
          <% } %>-%>
          <% for (let itm of item.items) { %>-%>
            <% if (itm.component === null) { %>-%>
              <% if (itm.type === 'string') { %>-%>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-input placeholder="请输入<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" />
        </a-form-item>-%>
              <% } else if (itm.type === 'number') { %>-%>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-input-number placeholder="请输入<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" />
        </a-form-item>-%>
              <% } else if (itm.type === 'date') { %>-%>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-date-picker style="width: 100%" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" placeholder="请选择<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" />
        </a-form-item>-%>
              <% } %>-%>
            <% } else { %>-%>
              <% if (itm.component.name === 'ENUM_SELECT') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <cube-select-enum placeholder="请选择<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" enum="<%= itm.component.params.classPath %>"></cube-select-enum>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'MULTI_SELECT_TAG') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-multi-select-tag placeholder="请选择<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" dictCode="<%= itm.component.params.dictCode %>"></j-multi-select-tag>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SEARCH_SELECT_TAG') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-search-select-tag placeholder="请选择<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" dict="<%= itm.component.params.dictCode %>" :async="true"></j-search-select-tag>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'DICT_SELECT_TAG') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-dict-select-tag placeholder="请选择<%= itm.title %>" dictCode="<%= itm.component.params.dictCode %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" :triggerChange="true"></j-dict-select-tag>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT_DEPART') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-select-depart v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></j-select-depart>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT_MULTI_USER') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-select-multi-user v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></j-select-multi-user>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT_POSITION') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-select-position v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></j-select-position>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT_ROLE') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-select-role v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></j-select-role>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT_USER_BY_DEPART') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-select-user-by-dep v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></j-select-user-by-dep>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'DATE') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-date-picker style="width: 100%" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" placeholder="请选择<%= itm.title %>" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'DATE_TIME') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-date-picker style="width: 100%" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" placeholder="请选择<%= itm.title %>" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'DATE_BETWEEN') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-range-picker style="width: 100%" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" :placeholder="['开始时间', '结束时间']" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'STRING') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-input placeholder="请输入<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"></a-input>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'NUMBER') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-input-number placeholder="请输入<%= itm.title %>" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" style="width: 100%"></a-input-number>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SELECT') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-select v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" placeholder="请选择<%= itm.title %>">
          <% for (let option of itm.options) { %>
            <a-select-option value="<%= option.value %>"><%= option.label %></a-select-option>
          <% } %>
          </a-select>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'POPUP') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-popup
            v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"
            :trigger-change="true"
            org-fields="<%= itm.dictField %>"
            dest-fields="<%= itm.dictText %>"
            code="<%= itm.dictTable %>"
            @callback="popupCallback"
          />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'SWITCH') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-switch v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" <% if (itm.component.params && itm.component.params.dictCode) { %>:options="<%= itm.component.params.dictCode %>"<% } %>></j-switch>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'AREA_LINKAGE') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-area-linkage type="cascader" v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" placeholder="请输入省市区" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'MARKDOWN_EDITOR') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-markdown-editor v-decorator="['<%= itm.dataIndex %>', { initialValue: '' }]" id="<%= itm.dataIndex %>"></j-markdown-editor>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'PASSWORD') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-input-password v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" placeholder="请输入<%= itm.title %>" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'TEXTAREA') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <a-textarea v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" rows="4" placeholder="请输入<%= itm.title %>" />
        </a-form-item>
              <% } else if (itm.component.name === 'CATEGORY_SELECT') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-category-select v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" pcode="<%= itm.dictField %>" placeholder="请选择<%= itm.title %>" <% if (itm.dictText) { %>back="<%= itm.dictText %>"<% } %> @change="handleCategoryChange" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'UPLOAD') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-upload v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" :trigger-change="true" <% if (itm.component.params && itm.component.params.uploadNum) { %>:number="<%= itm.uploadNum %>" %><% } %> ></j-upload>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'IMAGE_UPLOAD') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-image-upload v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]" isMultiple <% if (itm.component.params && itm.component.params.uploadNum) { %>:number="<%= itm.uploadNum %>"<% } %> ></j-image-upload>
        </a-form-item>-%>
              <% } else if (itm.component.name === 'EDITOR') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-editor v-decorator="['<%= itm.dataIndex %>', { trigger: 'input' }]" />
        </a-form-item>-%>
              <% } else if (itm.component.name === 'TREE_SELECT') { %>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="<%= itm.title %>">
          <j-tree-select
            ref="treeSelect"
            placeholder="请选择<%= itm.title %>"
            v-decorator="['<%= itm.dataIndex %>', validatorRules.<%= itm.dataIndex %>]"
            <% if (itm.component.params.dictCode) { %>dict="<%= itm.component.params.dictCode %>"<% } %>
            <% if (itm.component.params.pidField) { %>pidField="<%= itm.component.params.pidField %>"<% } %>-%>
            <% if (itm.component.params.hasChildField) { %>hasChildField="<%= itm.component.params.hasChildField %>"<% } %>-%>
            <% if (itm.component.params.pidValue) { %>pidValue="<%= itm.component.params.pidValue %>"<% } %>
          >
          </j-tree-select>
        </a-form-item>-%>
              <% } %>-%>
            <% } %>-%>
          <% } %>-%>
        <% } %>-%>
      <% } %>`
