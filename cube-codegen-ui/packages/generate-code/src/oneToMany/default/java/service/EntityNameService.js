export default `package <%= businessPackage %>.<%= modulePackage %>.service;-%>
<% for (let item of subTableList ) { %>
import <%= businessPackage %>.<%= modulePackage %>.entity.<%= item.entityName %>;-%>
<% } %>
import <%= entityPackage %>.<%= entityName %>;
import com.baomidou.mybatisplus.extension.service.IService;
import java.util.List;
import java.io.Serializable;

/**
 * <%= description %>
 * @author  cube
 * @since   <%= today %>
 * @version V2.0.0
 */
public interface I<%= entityName %>Service extends IService<<%= entityName %>> {

  /**
   * 添加一对多
   * 
   */
  void saveMain(<%= entityName %> <%= entityNameLower %><% for (let item of subTableList) { %>, List<<%= item.entityName %>> <%= item.entityNameLower %>List<% } %>) ;
  
  /**
   * 修改一对多
   * 
   */
  void updateMain(<%= entityName %> <%= entityNameLower %><% for (let item of subTableList) { %>, List<<%= item.entityName %>> <%= item.entityNameLower %>List<% } %>);
  
  /**
   * 删除一对多
   */
  void delMain (Serializable id);
  
  /**
   * 批量删除一对多
   */
  void delBatchMain (List<Serializable> idList);
}
`
