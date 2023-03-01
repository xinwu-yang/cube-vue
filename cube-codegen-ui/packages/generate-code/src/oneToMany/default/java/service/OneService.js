export default `package <%= businessPackage %>.<%= modulePackage %>.service;

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

  List<<%= entityName %>> selectByMainId(Serializable mainId);
}
`
