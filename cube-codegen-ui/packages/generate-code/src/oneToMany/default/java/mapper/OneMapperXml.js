export default `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="<%= businessPackage %>.<%= modulePackage %>.mapper.<%= entityName %>Mapper">

  <delete id="deleteByMainId" parameterType="java.lang.Long">
    DELETE 
    FROM  <%= databaseTableName %>
    WHERE
       <%= foreignKeyLine %> = #{mainId}
  </delete>
  
  <select id="selectByMainId" parameterType="java.lang.Long" resultType="<%= entityPackage %>.<%= entityName %>">
    SELECT * 
    FROM  <%= databaseTableName %>
    WHERE
       <%= foreignKeyLine %> = #{mainId}
  </select>
</mapper>
`
