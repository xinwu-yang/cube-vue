export default `package <%= businessPackage %>.<%= modulePackage %>.service.impl;

import <%= entityPackage %>.<%= entityName %>;-%>
<% for (let item of subTableList) { %>
import <%= item.entityPackage %>.<%= item.entityName %>;-%>
<% } %>
<% for (let item of subTableList) { %>
import <%= businessPackage %>.<%= modulePackage %>.mapper.<%= item.entityName %>Mapper;-%>
<% } %>
import <%= businessPackage %>.<%= modulePackage %>.mapper.<%= entityName %>Mapper;
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= entityName %>Service;
import org.springframework.stereotype.Service;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.io.Serializable;

/**
 * <%= entityName %>
 * @author  cube
 * @since   <%= entityName %>
 * @version V2.0.0
 */
@Service
public class <%= entityName %>ServiceImpl extends ServiceImpl<<%= entityName %>Mapper, <%= entityName %>> implements I<%= entityName %>Service {

  @Autowired
  private <%= entityName %>Mapper <%= entityNameLower %>Mapper;-%>
  <% for (let item of subTableList) { %>
  @Autowired
  private <%= item.entityName %>Mapper <%= item.entityNameLower %>Mapper;-%>
  <% } %>
  
  @Override
  @Transactional
  public void saveMain(<%= entityName %> <%= entityNameLower %><% for (let item of subTableList) { %>, List<<%= item.entityName %>> <%= item.entityNameLower %>List<% } %>) {
    <%= entityNameLower %>Mapper.insert(<%= entityNameLower %>);
    <% for (let item of subTableList) { %>
    if(<%= item.entityNameLower %>List!=null && <%= item.entityNameLower %>List.size()>0) {
      for(<%= item.entityName %> entity:<%= item.entityNameLower %>List) {
        // 外键设置
        entity.set<%= item.foreignKeyUpper %>(<%= entityNameLower %>.getId());
        <%= item.entityNameLower %>Mapper.insert(entity);
      }
    }
    <% } %>
  }

  @Override
  @Transactional
  public void updateMain(<%= entityName %> <%= entityNameLower %><% for (let item of subTableList) { %>, List<<%= item.entityName %>> <%= item.entityNameLower %>List<% } %>) {
    <%= entityNameLower %>Mapper.updateById(<%= entityNameLower %>);
    
    // 1.先删除子表数据-%>
    <% for (let item of subTableList) { %>
    <%= item.entityNameLower %>Mapper.deleteByMainId(<%= entityNameLower %>.getId());-%>
    <% } %>
    
    // 2.子表数据重新插入-%>
    <% for (let item of subTableList) { %>
    if(<%= item.entityNameLower %>List!=null && <%= item.entityNameLower %>List.size()>0) {
      for(<%= item.entityName %> entity:<%= item.entityNameLower %>List) {
        // 外键设置
        entity.set<%= item.foreignKeyUpper %>(<%= entityNameLower %>.getId());
        <%= item.entityNameLower %>Mapper.insert(entity);
      }
    }-%>
    <% } %>
  }

  @Override
  @Transactional
  public void delMain(Serializable id) {-%>
    <% for (let item of subTableList) { %>
    <%= item.entityNameLower %>Mapper.deleteByMainId(id);-%>
    <% } %>
    <%= entityNameLower %>Mapper.deleteById(id);
  }

  @Override
  @Transactional
  public void delBatchMain(List<Serializable> idList) {
    for(Serializable id:idList) {-%>
      <% for (let item of subTableList) { %>
      <%= item.entityNameLower %>Mapper.deleteByMainId(id.toString());-%>
      <% } %>
      <%= entityNameLower %>Mapper.deleteById(id);
    }
  }
  
}
`
