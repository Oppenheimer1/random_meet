srcdir = .


include ../../Mk/macports.autoconf.mk

OBJS=		CFLib.o
SHLIB_NAME=	CFLib${SHLIB_SUFFIX}
LIBS+=		-framework CoreFoundation
INSTALLDIR= ${DESTDIR}${TCL_PACKAGE_PATH}/cflib1.0

include $(srcdir)/../../Mk/macports.tea.mk
