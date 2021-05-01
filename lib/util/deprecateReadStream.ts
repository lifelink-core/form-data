import {deprecate} from "util"

import isReadStream from "./isReadStream"

function deprecateReadStream(
  _t: unknown,
  _k: string,
  descriptor: PropertyDescriptor
) {
  let fn = descriptor.value

  descriptor.value = function (...args: any[]) {
    if (isReadStream(args[1])) {
      fn = deprecate(
        fn,
        "The usage of ReadStream as field's value is deprecated. "
          + "Use fileFromPathSync() instead."
      )
    }

    return fn.apply(this, args)
  }
}

export default deprecateReadStream