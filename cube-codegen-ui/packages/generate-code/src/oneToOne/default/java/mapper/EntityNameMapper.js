export default `package <%= businessPackage %>.<%= modulePackage %>.mapper;

import <%= entityPackage %>.<%= entityName %>;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <%= description %>
 * @author      cube
 * @since       <%= today %>
 * @version     V2.0.0
 */
public interface <%= entityName %>Mapper extends BaseMapper<<%= entityName %>> {

}`
