export default `package <%= businessPackage %>.<%= modulePackage %>.vo;

import java.util.List;-%>
<% for (let item of subTableList) { %>
import <%= item.entityPackage %>.<%= item.entityName %>;-%>
<% } %>
import lombok.Data;
import com.tievd.cube.commons.easyexcel.annotations.Excel;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;
import com.tievd.cube.commons.annotations.Dict;

/**
 * <%= description %>
 * 
 * @author  cube
 * @since   <%= today %>
 * @version V2.0.0
 */
@Data
public class <%= entityName %>Page {-%>
  <% for (let item of tableColumnList) { %>
  /**<%= item.title %>*/-%>
    <% if (item.component.name === 'SELECT_MULTI_USER') { %>-%>
  @Dict(table = "sys_user", text = "realname", value = "username")-%>
    <% } else if (item.component.name === 'SELECT_DEPART') { %>
  @Dict(table = "sys_depart", text = "depart_name", value = "id")-%>
    <% } else if (item.component.name === 'SEARCH_SELECT_TAG' || item.component.name === 'MULTI_SELECT_TAG') { %>
  @Dict(table = "<%= item.dictTable %>", text = "<%= item.dictText %>", value = "<%= item.dictField %>")-%>
    <% } else if (item.component.name === 'DATE') { %>
      <% if (!excelIgnoreArr.includes(item.dataIndex)) { %>
  @Excel("<%= item.title %>")-%>
      <% } %>
  @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
  @DateTimeFormat(pattern = "yyyy-MM-dd")-%>
    <% } else if (item.component.name === 'DATE_TIME') { %>
      <% if (!excelIgnoreArr.includes(item.dataIndex)) { %>
  @Excel("<%= item.title %>")-%>
      <% } %>-%>
    <% } %>
  private <%= item.component.basicType %> <%= item.dataIndex %>;-%>
  <% } %>-%>

  <% for (let item of subTableList) { %>
  private List<<%= item.entityName %>> <%= item.entityNameLower %>List;-%>
  <% } %>
}    
`
