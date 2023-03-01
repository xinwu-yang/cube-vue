export default `package <%= businessPackage %>.<%= modulePackage %>.service.impl;

import <%= entityPackage %>.<%= entityName %>;
import <%= businessPackage %>.<%= modulePackage %>.mapper.<%= entityName %>Mapper;
import <%= businessPackage %>.<%= modulePackage %>.service.I<%= entityName %>Service;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * <%= description %>
 * @author      cube
 * @since       <%= today %>
 * @version     V2.0.0
 */
@Service
public class <%= entityName %>ServiceImpl extends ServiceImpl<<%= entityName %>Mapper, <%= entityName %>> implements I<%= entityName %>Service {

}`
