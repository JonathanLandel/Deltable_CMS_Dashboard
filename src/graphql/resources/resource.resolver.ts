import { Injectable } from "@graphql-modules/di";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Args,
  FieldResolver,
  Root,
} from "type-graphql";

import {
  Resource,
  ResourceRecord,
  ResourceRef,
  Pagination,
} from "./resource.type";
import { ResourceContainer } from "./resource";

@Injectable()
@Resolver((of) => Resource)
export default class ResourceResolver {
  constructor(private readonly resourceService: ResourceContainer) {}

  @Query((returns) => [ResourceRef])
  async Resources(
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    return (await this.resourceService.listResources(Page)) as ResourceRef[];
  }

  @Query((returns) => ResourceRef)
  async Resource(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const resources = await this.resourceService.getResource(ID);
    return {
      ...resources,
      ref: resources.ref.toString(),
    } as ResourceRef;
  }

  @Query((returns) => [ResourceRef])
  async ResourceByName(
    @Arg("Name", {
      nullable: false,
    })
    Name: string,
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    const resources = await this.resourceService.getByResourceName(Name, Page);
    console.log(resources);
    return resources as ResourceRef[];
  }

  @Query((returns) => [ResourceRef])
  async ResourceByTag(
    @Arg("Tag", {
      nullable: false,
    })
    Tag: string,
    @Arg("Page", {
      nullable: true,
      defaultValue: {
        count: 10,
        after: null,
        before: null,
      },
    })
    Page: Pagination
  ) {
    const resources = await this.resourceService.getByResourceTag(Tag, Page);
    return resources as ResourceRef[];
  }

  @Query((returns) => [String])
  async AllResourceTags() {
    return await this.resourceService.listResourcesTags();
  }

  @Mutation((returns) => ResourceRef)
  async CreateResource(
    @Arg("Record", {
      nullable: false,
    })
    Record: ResourceRecord
  ) {
    const resource = await this.resourceService.createResource(Record);
    return resource as ResourceRef;
  }

  @Mutation((returns) => ResourceRef)
  async ReplaceResource(
    @Arg("ID", {
      nullable: false,
    })
    ID: string,
    @Arg("Record", {
      nullable: false,
    })
    Record: ResourceRecord
  ) {
    const resource = await this.resourceService.replaceResource(ID, Record);
    return resource as ResourceRecord;
  }

  @Mutation((returns) => ResourceRef)
  async DeleteResource(
    @Arg("ID", {
      nullable: false,
    })
    ID: string
  ) {
    const resource = await this.resourceService.deleteResource(ID);
    return resource as ResourceRef;
  }
}
