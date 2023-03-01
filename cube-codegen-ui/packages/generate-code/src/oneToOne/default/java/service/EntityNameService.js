export default `package <%= businessPackage %>.<%= modulePackage %>.service;

import <%= entityPackage %>.<%= entityName %>;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <%= description %>
 * @author      cube
 * @since       <%= today %>
 * @version     V2.0.0
 */
public interface I<%= entityName %>Service extends IService<<%= entityName %>> {

}`
