export default `package <%= businessPackage %>.<%= modulePackage %>.mapper;

import java.util.List;
import <%= entityPackage %>.<%= entityName %>;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import java.io.Serializable;

/**
 * <%= description %>
 * @author  cube
 * @since   <%= today %>
 * @version V2.0.0
 */
public interface <%= entityName %>Mapper extends BaseMapper<<%= entityName %>> {

  boolean deleteByMainId(@Param("mainId") Serializable mainId);
    
  List<<%= entityName %>> selectByMainId(@Param("mainId") Serializable mainId);
}
`
