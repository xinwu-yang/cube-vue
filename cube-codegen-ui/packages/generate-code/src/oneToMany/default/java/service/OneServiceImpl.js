export default `package <%= businessPackage %>.<%= modulePackage %>.service.impl;
        
import <%= entityPackage %>.<%= entityName %>;
import <%= businessPackage %>.<%= modulePackage %>.mapper.<%= entityName %>Mapper;
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= entityName %>Service;
import org.springframework.stereotype.Service;
import java.util.List;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.Serializable;

/**
 * <%= description %>
 * @author  cube
 * @since   <%= today %>
 * @version V2.0.0
 */
@Service
public class <%= entityName %>ServiceImpl extends ServiceImpl<<%= entityName %>Mapper, <%= entityName %>> implements I<%= entityName %>Service {
  
  @Autowired
  private <%= entityName %>Mapper <%= entityNameLower %>Mapper;
  
  @Override
  public List<<%= entityName %>> selectByMainId(Serializable mainId) {
    return <%= entityNameLower %>Mapper.selectByMainId(mainId);
  }
}
`
