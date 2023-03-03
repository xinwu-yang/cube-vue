export default `package <%= businessPackage %>.<%= modulePackage %>.controller;
  
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.cube.commons.mybatisplus.QueryGenerator;
import org.cube.commons.annotations.DictApi;
import org.cube.commons.annotations.AutoLog;
import org.cube.commons.base.CubeController;
import org.cube.commons.base.Result;
import <%= entityPackage %>.<%= entityName %>;
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= entityName %>Service;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * <%= description %>
 * 
 * @author      cube
 * @since       <%= today %>
 * @version     V2.0.0
 */
@Slf4j
@DictApi
@RestController
@RequestMapping("/<%= modulePackage %>/<%= entityNameLower %>")
public class <%= entityName %>Controller extends CubeController<<%= entityName %>, I<%= entityName %>Service> {

  @Autowired
  private I<%= entityName %>Service <%= entityNameLower %>Service;
  
  /**
   * 分页列表查询
   */
  @GetMapping("/list")
  public Result<?> queryPageList(<%= entityName %> <%= entityNameLower %>,
                    @RequestParam(defaultValue="1") Integer pageNo,
                    @RequestParam(defaultValue="10") Integer pageSize,
                    HttpServletRequest req) {
    QueryWrapper<<%= entityName %>> queryWrapper = QueryGenerator.initQueryWrapper(<%= entityNameLower %>, req.getParameterMap());
    Page<<%= entityName %>> page = new Page<>(pageNo, pageSize);
    IPage<<%= entityName %>> pageList = <%= entityNameLower %>Service.page(page, queryWrapper);
    return Result.ok(pageList);
  }
  
  /**
   * 添加
   */
  @AutoLog("<%= description %>-添加")
  @PostMapping("/add")
  public Result<?> add(@RequestBody <%= entityName %> <%= entityNameLower %>) {
    <%= entityNameLower %>Service.save(<%= entityNameLower %>);
    return Result.ok();
  }
  
  /**
   * 编辑
   */
  @AutoLog("<%= description %>-编辑")
  @PutMapping("/edit")
  public Result<?> edit(@RequestBody <%= entityName %> <%= entityNameLower %>) {
    <%= entityNameLower %>Service.updateById(<%= entityNameLower %>);
    return Result.ok();
  }
  
  /**
   * 通过id删除
   */
  @AutoLog("<%= description %>-通过id删除")
  @DeleteMapping("/delete")
  public Result<?> delete(@RequestParam String id) {
    <%= entityNameLower %>Service.removeById(id);
    return Result.ok();
  }
  
  /**
   * 批量删除
   */
  @AutoLog("<%= description %>-批量删除")
  @DeleteMapping("/deleteBatch")
  public Result<?> deleteBatch(@RequestParam String ids) {
    this.<%= entityNameLower %>Service.removeByIds(Arrays.asList(ids.split(",")));
    return Result.ok();
  }
  
  /**
   * 通过id查询
   */
  @GetMapping("/queryById")
  public Result<?> queryById(@RequestParam String id) {
    <%= entityName %> <%= entityNameLower %> = <%= entityNameLower %>Service.getById(id);
    return Result.ok(<%= entityNameLower %>);
  }

  /**
   * 导出excel
   */
  @RequestMapping("/exportXls")
  public void exportXls(HttpServletRequest request, HttpServletResponse response, <%= entityName %> <%= entityNameLower %>)  throws IOException {
      super.exportXls(request, response, <%= entityNameLower %>, "<%= description %>");
  }

  /**
   * 通过excel导入数据
   */
  @PostMapping("/importExcel")
  public Result<?> importExcel(HttpServletRequest request) throws Exception {
      return super.importExcel(request, <%= entityName %>.class);
  }
}`
