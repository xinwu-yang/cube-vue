export default `package <%= businessPackage %>.<%= modulePackage %>.controller;

import java.io.InputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.cube.modules.system.model.LoginUser;
import org.cube.plugin.easyexcel.EasyExcel;
import org.cube.plugin.easyexcel.dict.IDictTranslator;
import org.cube.plugin.easyexcel.model.ImportExcel;
import org.cube.commons.base.Result;
import org.cube.commons.utils.web.HttpServletUtil;
import org.cube.commons.mybatisplus.QueryGenerator;-%>
import org.cube.commons.annotations.DictApi;
import org.cube.commons.annotations.AutoLog;
import org.cube.commons.system.api.ISysBaseAPI;
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
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.collection.ListUtil;
import cn.hutool.core.convert.Convert;
import cn.hutool.core.util.StrUtil;
import cn.dev33.satoken.stp.StpUtil;

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
   * ??????????????????
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
   * ??????
   */
  @AutoLog("<%= description %>-??????")
  @PostMapping("/add")
  public Result<?> add(@RequestBody <%= entityName %>Page <%= entityNameLower %>Page) {
    <%= entityName %> <%= entityNameLower %> = new <%= entityName %>();
    BeanUtils.copyProperties(<%= entityNameLower %>Page, <%= entityNameLower %>);
    <%= entityNameLower %>Service.saveMain(<%= entityNameLower %><% for (let item of subTableList) { %>, <%= entityNameLower %>Page.get<%= item.entityName %>List()<% } %>);
    return Result.ok();
  }
  
  /**
   * ??????
   */
  @AutoLog("<%= description %>-??????")
  @PutMapping("/edit")
  public Result<?> edit(@RequestBody <%= entityName %>Page <%= entityNameLower %>Page) {
    <%= entityName %> <%= entityNameLower %> = new <%= entityName %>();
    BeanUtils.copyProperties(<%= entityNameLower %>Page, <%= entityNameLower %>);
    <%= entityName %> <%= entityNameLower %>Entity = <%= entityNameLower %>Service.getById(<%= entityNameLower %>.getId());
    if(<%= entityNameLower %>Entity==null) {
      return Result.error("????????????????????????");
    }
    <%= entityNameLower %>Service.updateMain(<%= entityNameLower %><% for (let item of subTableList) { %>, <%= entityNameLower %>Page.get<%= item.entityName %>List()<% } %>);
    return Result.ok();
  }
  
  /**
   * ??????id??????
   */
  @AutoLog("<%= description %>-??????id??????")
  @DeleteMapping("/delete")
  public Result<?> delete(@RequestParam Long id) {
    <%= entityNameLower %>Service.delMain(id);
    return Result.ok();
  }
  
  /**
   * ????????????
   */
  @AutoLog("<%= description %>-????????????")
  @DeleteMapping("/deleteBatch")
  public Result<?> deleteBatch(@RequestParam String ids) {
    this.<%= entityNameLower %>Service.delBatchMain(ListUtil.toList(Convert.toLongArray(ids.split(","))));
    return Result.ok();
  }
  
  /**
   * ??????id??????<%= description %>
   */
  @GetMapping("/queryById")
  public Result<?> queryById(Long id) {
    <%= entityName %> <%= entityNameLower %> = <%= entityNameLower %>Service.getById(id);
    if(<%= entityNameLower %>==null) {
      return Result.error("????????????????????????");
    }
    return Result.ok(<%= entityNameLower %>);

  }
  <% for (let item of subTableList ) { %>
  /**
   * ??????id??????<%= item.description %>
   */
  @GetMapping("/query<%= item.entityName %>ByMainId")
  public Result<?> query<%= item.entityName %>ListByMainId(@RequestParam Long id) {
    List<<%= item.entityName %>> <%= item.entityNameLower %>List = <%= item.entityNameLower %>Service.selectByMainId(id);
    return Result.ok(<%= item.entityNameLower %>List);
  }
  <% } %>

  /**
  * ??????excel
  */
  @RequestMapping("/exportXls")
  public void exportXls(HttpServletRequest request, HttpServletResponse response, <%= entityName %> <%= entityNameLower %>) throws IOException {
    // Step.1 ??????????????????????????????
    QueryWrapper<<%= entityName %>> queryWrapper = QueryGenerator.initQueryWrapper(<%= entityNameLower %>, request.getParameterMap());
    
    String username = StpUtil.getLoginIdAsString();
    // ???????????????????????????
    LoginUser user = sysBaseAPI.getUserByName(username);

    // Step.2 ??????????????????
    List<<%= entityName %>> queryList = <%= entityNameLower %>Service.list(queryWrapper);
    // ??????????????????
    String selections = request.getParameter("selections");
    List<<%= entityName %>> <%= entityNameLower %>List;
    if(StrUtil.isEmpty(selections)) {
        <%= entityNameLower %>List = queryList;
    } else {
        List<String> selectionList = Arrays.asList(selections.split(","));
        <%= entityNameLower %>List = queryList.stream().filter(item -> selectionList.contains(item.getId().toString())).collect(Collectors.toList());
    }

    // Step.3 ??????pageList
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

    // ??????????????????
    String date = DateUtil.format(new Date(), "yyyyMMddHHmmss");
    HttpServletUtil.addDownloadHeader(response, "<%= description %>??????-" + date + easyExcel.getExtension());
    easyExcel.export(pageList, response.getOutputStream(), dictTranslator);
  }

  /**
  * ??????excel????????????
  */
  @PostMapping("/importExcel")
  public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
    MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
    Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
    for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
        MultipartFile file = entity.getValue();// ????????????????????????
        try (InputStream inputStream = file.getInputStream()) {
            ImportExcel excel = new ImportExcel();
            excel.setInputStream(inputStream);
            List<<%= entityName %>Page> list = easyExcel.read(<%= entityName %>Page.class, excel, dictTranslator);
            for (<%= entityName %>Page page : list) {
                <%= entityName %> po = new <%= entityName %>();
                BeanUtils.copyProperties(page, po);
                <%= entityNameLower %>Service.saveMain(po<% for (let item of subTableList) { %>, page.get<%= item.entityName %>List()<% } %>);
            }
            return Result.ok("????????????????????????????????????" + list.size());
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return Result.error("??????????????????????????????" + e.getMessage());
        }
    }
    return Result.error("?????????????????????");
  }
}
`
