export default `package <%= businessPackage %>.<%= modulePackage %>.controller;

import java.io.InputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tievd.cube.common.system.vo.LoginUser;
import com.tievd.cube.commons.base.Result;
import com.tievd.cube.commons.easyexcel.EasyExcel;
import com.tievd.cube.commons.easyexcel.dict.IDictTranslator;
import com.tievd.cube.commons.easyexcel.model.ImportExcel;
import com.tievd.cube.commons.utils.http.HttpHeaderUtils;
import com.tievd.cube.common.system.query.QueryGenerator;-%>
<% for (let item of subTableList) { %>
import <%= item.entityPackage %>.<%= item.entityName %>;-%>
<% } %>
import <%= entityPackage %>.<%= entityName %>;
import <%= businessPackage %>.<%= modulePackage %>.vo.<%= entityName %>Page;
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= entityName %>Service;-%>
<% for (let item of subTableList) { %>
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= item.entityName %>Service;-%>
<% } %>
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import com.tievd.cube.commons.annotations.DictApi;
import com.tievd.cube.commons.annotations.AutoLog;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.dev33.satoken.stp.StpUtil;
import com.tievd.cube.common.system.api.ISysBaseAPI;

  /**
   * <%= description %>
   * 
   * @author  cube
   * @since   <%= today %>
   * @version V2.0.0
   */
@Slf4j
@DictApi
@RestController
@RequestMapping("/<%= modulePackage %>/<%= entityNameLower %>")
public class <%= entityName %>Controller {

  @Autowired
  private I<%= entityName %>Service <%= entityNameLower %>Service;-%>
  <% for (let item of subTableList) { %>
  @Autowired
  private I<%= item.entityName %>Service <%= item.entityNameLower %>Service;-%>
  <% } %>
  @Autowired
  private ISysBaseAPI sysBaseAPI;
  @Autowired
  private EasyExcel easyExcel;
  @Autowired
  private IDictTranslator dictTranslator;
  
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
  public Result<?> add(@RequestBody <%= entityName %>Page <%= entityNameLower %>Page) {
    <%= entityName %> <%= entityNameLower %> = new <%= entityName %>();
    BeanUtils.copyProperties(<%= entityNameLower %>Page, <%= entityNameLower %>);
    <%= entityNameLower %>Service.saveMain(<%= entityNameLower %><% for (let item of subTableList) { %>, <%= entityNameLower %>Page.get<%= item.entityName %>List()<% } %>);
    return Result.ok();
  }
  
  /**
   * 编辑
   */
  @AutoLog("<%= description %>-编辑")
  @PutMapping("/edit")
  public Result<?> edit(@RequestBody <%= entityName %>Page <%= entityNameLower %>Page) {
    <%= entityName %> <%= entityNameLower %> = new <%= entityName %>();
    BeanUtils.copyProperties(<%= entityNameLower %>Page, <%= entityNameLower %>);
    <%= entityName %> <%= entityNameLower %>Entity = <%= entityNameLower %>Service.getById(<%= entityNameLower %>.getId());
    if(<%= entityNameLower %>Entity==null) {
      return Result.error("未找到对应数据！");
    }
    <%= entityNameLower %>Service.updateMain(<%= entityNameLower %><% for (let item of subTableList) { %>, <%= entityNameLower %>Page.get<%= item.entityName %>List()<% } %>);
    return Result.ok();
  }
  
  /**
   * 通过id删除
   */
  @AutoLog("<%= description %>-通过id删除")
  @DeleteMapping("/delete")
  public Result<?> delete(@RequestParam Long id) {
    <%= entityNameLower %>Service.delMain(id);
    return Result.ok();
  }
  
  /**
   * 批量删除
   */
  @AutoLog("<%= description %>-批量删除")
  @DeleteMapping("/deleteBatch")
  public Result<?> deleteBatch(@RequestParam String ids) {
    this.<%= entityNameLower %>Service.delBatchMain(ListUtil.toList(Convert.toLongArray(ids.split(","))));
    return Result.ok();
  }
  
  /**
   * 通过id查询<%= description %>
   */
  @GetMapping("/queryById")
  public Result<?> queryById(Long id) {
    <%= entityName %> <%= entityNameLower %> = <%= entityNameLower %>Service.getById(id);
    if(<%= entityNameLower %>==null) {
      return Result.error("未找到对应数据！");
    }
    return Result.ok(<%= entityNameLower %>);

  }
  <% for (let item of subTableList ) { %>
  /**
   * 通过id查询<%= item.description %>
   */
  @GetMapping("/query<%= item.entityName %>ByMainId")
  public Result<?> query<%= item.entityName %>ListByMainId(@RequestParam Long id) {
    List<<%= item.entityName %>> <%= item.entityNameLower %>List = <%= item.entityNameLower %>Service.selectByMainId(id);
    return Result.ok(<%= item.entityNameLower %>List);
  }
  <% } %>

  /**
  * 导出excel
  */
  @RequestMapping("/exportXls")
  public void exportXls(HttpServletRequest request, HttpServletResponse response, <%= entityName %> <%= entityNameLower %>) throws IOException {
    // Step.1 组装查询条件查询数据
    QueryWrapper<<%= entityName %>> queryWrapper = QueryGenerator.initQueryWrapper(<%= entityNameLower %>, request.getParameterMap());
    
    String username = StpUtil.getLoginIdAsString();
    // 当前登陆用户的信息
    LoginUser user = sysBaseAPI.getUserByName(username);

    // Step.2 获取导出数据
    List<<%= entityName %>> queryList = <%= entityNameLower %>Service.list(queryWrapper);
    // 过滤选中数据
    String selections = request.getParameter("selections");
    List<<%= entityName %>> <%= entityNameLower %>List;
    if(StrUtil.isEmpty(selections)) {
        <%= entityNameLower %>List = queryList;
    } else {
        List<String> selectionList = Arrays.asList(selections.split(","));
        <%= entityNameLower %>List = queryList.stream().filter(item -> selectionList.contains(item.getId().toString())).collect(Collectors.toList());
    }

    // Step.3 组装pageList
    List<<%= entityName %>Page> pageList = new ArrayList<>();
    for (<%= entityName %> main : <%= entityNameLower %>List) {
        <%= entityName %>Page vo = new <%= entityName %>Page();
        BeanUtils.copyProperties(main, vo);-%>
        <% for (let item of subTableList) { %>
        List<<%= item.entityName %>> <%= item.entityNameLower %>List = <%= item.entityNameLower %>Service.selectByMainId(main.getId());
        vo.set<%= item.entityName %>List(<%= item.entityNameLower %>List);-%>
        <% } %>
        pageList.add(vo);
    }

    // 导出文件名称
    String date = DateUtil.format(new Date(), "yyyyMMddHHmmss");
    HttpHeaderUtils.addDownloadHeader(response, "<%= description %>数据-" + date + easyExcel.getExtension());
    easyExcel.export(pageList, response.getOutputStream(), dictTranslator);
  }

  /**
  * 通过excel导入数据
  */
  @PostMapping("/importExcel")
  public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
    Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
    for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
        MultipartFile file = entity.getValue();// 获取上传文件对象
        try (InputStream inputStream = file.getInputStream()) {
            ImportExcel excel = new ImportExcel();
            excel.setInputStream(inputStream);
            List<<%= entityName %>Page> list = easyExcel.read(<%= entityName %>Page.class, excel, dictTranslator);
            for (<%= entityName %>Page page : list) {
                <%= entityName %> po = new <%= entityName %>();
                BeanUtils.copyProperties(page, po);
                <%= entityNameLower %>Service.saveMain(po<% for (let item of subTableList) { %>, page.get<%= item.entityName %>List()<% } %>);
            }
            return Result.ok("文件导入成功！数据行数：" + list.size());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return Result.error("文件导入失败！原因：" + e.getMessage());
        }
    }
    return Result.error("文件导入失败！");
  }
}
`
