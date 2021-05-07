/**
 * @module {Object} services
 * @property {Object}	ArchiveService  档案相关服务 {@link module:services/ArchiveService}
 * @property {Object}	FamilyService  家庭相关服务 {@link module:services/FamilyService}
 * @property {Object}	BigEventService  大事件相关服务 {@link module:services/BigEventService}
 * @property {Object}	AnniversaryService  纪念日相关服务 {@link module:services/AnniversaryService}
 * @property {Object}	UserService  用户相关服务 {@link module:services/UserService}
 * @example
 * import services from services
 * services.ArchiveService.getFileCategorys({
 * 	  url:u,
 * 	  data:data,
 * 	  success (data,res){},
 * 	  error (e){},
 * 	  complete (){}
 * 	})
 */

import ArchiveService from './ArchiveService'
import FamilyService from './FamilyService'
import BigEventService from './BigEventService'
import AnniversaryService from './AnniversaryService'
import UserService from './UserService'

/**
 * service初始化使用的model
 * @type {Object}
 * @property {String} baseUrl 项目部署路径
 */
var model = {
	baseUrl: 'http://localhost:8090'
};

export default {
	ArchiveService: ArchiveService.init(model.baseUrl),
	FamilyService: FamilyService.init(model.baseUrl),
	BigEventService: BigEventService.init(model.baseUrl),
	AnniversaryService: AnniversaryService.init(model.baseUrl),
	UserService: UserService.init(model.baseUrl)
}
