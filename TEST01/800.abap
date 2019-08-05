*********************************************************************
*  程序名:ZPP_SF0002
*  程序名称：生产入库送检单打印程序
*  创建人：艾伟峰
*  描述:
*    依据用户录入的条件筛选出符合条件的生产订单进行打印入库送检清单。
*-------------------------------------------------
*  创建日期          修改人    修改内容
*  2013-02-02     aiweifeng   create
*-------------------------------------------------

REPORT  ZPP_RE0002.

TYPE-POOLS:SLIS.

TABLES:AUFK,AFKO.

TYPES:BEGIN OF TY_ALVOUT,

        ZFLAG(1)    TYPE C,"选择
        AUART       TYPE AUFK-AUART,"订单类型
        AUFNR       TYPE AUFK-AUFNR,"生产订单号
        DISPO       TYPE AFKO-DISPO,"MRP控制者
        FEVOR       TYPE AFKO-FEVOR,"生产调度员
        PSPEL       TYPE CHAR24,"WBS元素
        PLNBEZ      TYPE AFKO-PLNBEZ,"物料号
        MAKTX       TYPE MAKT-MAKTX,"物料描述
        ZEINR       TYPE MARA-ZEINR,"图号
        GAMNG       TYPE AFKO-GAMNG,"订单数
        EBELN       TYPE EKPO-EBELN,"采购订单
        EBELP       TYPE EKPO-EBELP,"采购订单    "BY HSX ON 2019.09.18
        GSTRP       TYPE AFKO-GSTRP,"基本开始日期
        GLTRP       TYPE AFKO-GLTRP,"基本结束日期
        ZPRINTNUM   TYPE ZPP0001T-ZPRINTNUM,"打印次数
        ZPRINTDATE  TYPE ZPP0001T-ZPRINTDATE,"最后打印日期
        ZPRINTUSER  TYPE ZPP0001T-ZPRINTUSER,"最后打印人员

        WEMNG       TYPE AFPO-WEMNG,  "入库数量
        MEINS       TYPE AFPO-MEINS,  "单位
        STYL        TYPE LVC_T_STYL,

        "by hsx on 2013.09.17 begin(是否所有工序已报工)
        PROFINISH   TYPE C,
        "end

      END OF TY_ALVOUT,

      BEGIN OF TY_AUFK,

        AUART       TYPE AUFK-AUART,"订单类型
        AUFNR       TYPE AUFK-AUFNR,"生产订单号
        PSPEL       TYPE AUFK-PSPEL,"WBS元素
        OBJNR       TYPE AUFK-OBJNR,
      END OF TY_AUFK,

      BEGIN OF TY_AFKO,

        AUFNR       TYPE AFKO-AUFNR,  "生产订单号
        DISPO       TYPE AFKO-DISPO,  "MRP控制者
        FEVOR       TYPE AFKO-FEVOR,  "生产调度员
        PLNBEZ      TYPE AFKO-PLNBEZ, "物料号
        AUFPL       TYPE AFKO-AUFPL,  "工艺路线号
        GAMNG       TYPE AFKO-GAMNG,  "订单数
        GMEIN       TYPE AFKO-GMEIN,  "订单数

        GSTRP       TYPE AFKO-GSTRP,  "基本开始日期
        GLTRP       TYPE AFKO-GLTRP,  "基本结束日期


      END OF TY_AFKO,

      BEGIN OF TY_AFVC,

        AUFPL TYPE AFVC-AUFPL,
        APLZL TYPE AFVC-APLZL,
        VORNR TYPE AFVC-VORNR,
        BANFN TYPE AFVC-BANFN,"采购申请号
        BNFPO TYPE AFVC-BNFPO,"采购申请项目
        STEUS TYPE AFVC-STEUS,"工序外协控制码
        EBELN TYPE EBAN-EBELN,   "采购订单号
        EBELP       TYPE EKPO-EBELP,"采购订单    "BY HSX ON 2019.09.18
        LTXA1 TYPE AFVC-LTXA1,   "工序短文本1（第二行LTXA2略）
        OBJNR LIKE AFVC-OBJNR,   "对象号
        IFDEL TYPE C,             "删除标记

      END OF TY_AFVC,

      BEGIN OF TY_EKPO,

        EBELN  TYPE EKPO-EBELN,"采购订单
        EBELP  TYPE EKPO-EBELP,"采购订单项目号
        BANFN  TYPE EKPO-BANFN,"采购申请单
        BNFPO  TYPE EKPO-BNFPO,"采购申请单项目号

      END OF TY_EKPO,

      BEGIN OF TY_AFPO,

        AUFNR       TYPE AFPO-AUFNR,  "生产订单号
        PROJN       TYPE AFPO-PROJN,
        WEMNG       TYPE AFPO-WEMNG,  "入库数量
        MEINS       TYPE AFPO-MEINS,  "单位

      END OF TY_AFPO,

      BEGIN OF TY_MAKT,

        MATNR       TYPE MAKT-MATNR,"物料编码
        MAKTX       TYPE MAKT-MAKTX,"物料描述

      END OF TY_MAKT,

      BEGIN OF TY_PRINTLOG,

        ZTCODE      TYPE  ZPP0001T-ZTCODE,
        AUFNR       TYPE  ZPP0001T-AUFNR,
        ZPRINTNUM   TYPE  ZPP0001T-ZPRINTNUM,
        ZPRINTDATE  TYPE  ZPP0001T-ZPRINTDATE,
        ZPRINTUSER  TYPE  ZPP0001T-ZPRINTUSER,

      END OF TY_PRINTLOG,
      BEGIN OF TY_JEST,

        OBJNR TYPE JEST-OBJNR,"
        STAT  TYPE JEST-STAT,

      END OF TY_JEST,
      BEGIN OF TY_MARA,

         MATNR TYPE MARA-MATNR,"物料凭证
         ZEINR TYPE MARA-MATNR,"图号

      END OF TY_MARA.

"BY HSX ON 2013.07.04 BEGIN
DATA:BEGIN OF TABAFVV OCCURS 0,
           AUFPL TYPE AFVV-AUFPL,
           APLZL TYPE AFVV-APLZL,
           LMNGA TYPE AFVV-LMNGA,
     END OF TABAFVV.
DATA:WAAFVV LIKE LINE OF TABAFVV.
DATA:TABAFVVSINGLEAUFPL LIKE TABAFVV OCCURS 0 WITH HEADER LINE.
"END


"by hsx on 2013.09.06 begin(采购申请表信息,主要为了采购单号)
DATA:BEGIN OF TABEBAN OCCURS 0,
       BANFN TYPE EBAN-BANFN,   "采购申请编号
       BNFPO TYPE EBAN-BNFPO,   "采购申请项目号
       EBELN TYPE EBAN-EBELN,   "采购订单号
       EBELP TYPE EBAN-EBELP,   "采购订单项目号
END OF TABEBAN.
"end

"by hsx on 2013.09.17 begin
DATA:BEGIN OF OBJECTSTATUS OCCURS 0,
     OBJNR LIKE JEST-OBJNR,
     STAT  LIKE JEST-STAT,
END OF OBJECTSTATUS.
"end

DATA:REC_FLAG TYPE ZPP0001T-ZTCODE.

DATA:TAB_AUFK TYPE STANDARD TABLE OF TY_AUFK,
     TAB_AFKO TYPE STANDARD TABLE OF TY_AFKO,
     TAB_AFPO TYPE STANDARD TABLE OF TY_AFPO,
     TAB_AFVC TYPE STANDARD TABLE OF TY_AFVC,
     TAB_EKPO TYPE STANDARD TABLE OF TY_EKPO,
     TAB_MAKT TYPE STANDARD TABLE OF TY_MAKT,
     TAB_MARA TYPE STANDARD TABLE OF TY_MARA,
     TAB_PRINTLOG TYPE STANDARD TABLE OF TY_PRINTLOG,
     TAB_ALVOUT  TYPE STANDARD TABLE OF TY_ALVOUT,
     TAB_JEST TYPE STANDARD TABLE OF TY_JEST.


"BY HSX ON 2013.08.14 BEGIN(用于区别是否是重打)
DATA:TAB_PRINTLOG_COPY TYPE STANDARD TABLE OF TY_PRINTLOG.
DATA:WA_PRINTLOG_COPY LIKE LINE OF TAB_PRINTLOG_COPY.
"END

"by hsx on 2013.09.06 begin
DATA:TAB_AFVC_EXISTPR TYPE STANDARD TABLE OF TY_AFVC. "存在采购申请
"end

SELECTION-SCREEN BEGIN OF BLOCK B1 WITH FRAME TITLE TEXT-001.

PARAMETERS:P_WERKS TYPE AUFK-WERKS OBLIGATORY,"工厂
           P_AUART TYPE AUFK-AUART OBLIGATORY."订单类型

SELECT-OPTIONS:SO_AUFNR FOR AUFK-AUFNR,       "订单号
             "  SO_zsczy FOR AUFK-zsczy,       "订单号
               SO_GSTRP FOR AFKO-GSTRP,       "日期范围
               SO_DISPO FOR AFKO-DISPO,       "MRP控制者
               SO_FEVOR FOR AFKO-FEVOR.       "生产调度员

PARAMETERS:P_AGAIN AS CHECKBOX.
SELECTION-SCREEN END OF BLOCK B1.


INITIALIZATION.

  PERFORM SUB_INIT.

START-OF-SELECTION.

  PERFORM SUB_GET_DATA.


  PERFORM SUB_EDIT_DATA.

  PERFORM SUB_DISPLAY_ALV.





*&---------------------------------------------------------------------*
*&      Form  SUB_GET_DATA
*&---------------------------------------------------------------------*
*       取得对应的数据
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_GET_DATA.

  DATA:TAB_AUFK_TMP TYPE STANDARD TABLE OF TY_AUFK.
  DATA:TAB_AFKO_TMP TYPE STANDARD TABLE OF TY_AFKO.
  DATA:REC_AFKO TYPE TY_AFKO.
  DATA:TAB_AFVC_TMP TYPE STANDARD TABLE OF TY_AFVC.
  DATA:TAB_AFVC_TMP1 TYPE STANDARD TABLE OF TY_AFVC.
  DATA:REC_AFVC TYPE TY_AFVC.

  "BY HSX ON 2013.09.17 BEGIN
  DATA:TAB_AFVC_DEL TYPE STANDARD TABLE OF TY_AFVC.
  "END

*  DATA:REC_OBJKY TYPE TY_OBJKY.
IF SO_AUFNR IS NOT INITIAL .
  SELECT
    AUART "订单类型
    AUFNR "生产订单号
    PSPEL "WBS元素
    OBJNR "对象名
  FROM AUFK
  INTO CORRESPONDING FIELDS OF TABLE TAB_AUFK
  WHERE AUART = P_AUART
    AND WERKS = P_WERKS
    AND AUFNR IN SO_AUFNR.
    ENDIF.

*    IF SO_zsczy IS NOT INITIAL .
*      SELECT
*    AUART "订单类型
*    AUFNR "生产订单号
*    PSPEL "WBS元素
*    OBJNR "对象名
*  FROM AUFK
*  INTO CORRESPONDING FIELDS OF TABLE TAB_AUFK
*  WHERE AUART = P_AUART
*    AND WERKS = P_WERKS
*    AND zsczy IN SO_zsczy.
*        ENDIF.

  IF TAB_AUFK IS NOT INITIAL.

*    获取订单状态
    SELECT
      OBJNR
      STAT
    FROM JEST
    INTO CORRESPONDING FIELDS OF TABLE TAB_JEST
    FOR ALL ENTRIES IN TAB_AUFK
    WHERE OBJNR = TAB_AUFK-OBJNR
    and STAT eq  'I0045' "Kyle 20190610 技术性完成的订单，不予打印 508行校验
    and INACT eq ''.

   "   AND STAT  in ('I0009','I0010').
*      AND STAT  = 'I0002'.

    SELECT

      AUFNR
      DISPO
      FEVOR
      PLNBEZ
      AUFPL
      GAMNG
      GMEIN
      GSTRP
      GLTRP


    FROM AFKO
    INTO CORRESPONDING FIELDS OF TABLE TAB_AFKO
    FOR ALL ENTRIES IN TAB_AUFK
    WHERE AUFNR =   TAB_AUFK-AUFNR
      AND GSTRP IN  SO_GSTRP
      AND DISPO IN  SO_DISPO
      AND FEVOR IN  SO_FEVOR.

    IF TAB_AFKO IS NOT INITIAL.
*     获取信息
      SELECT
        AUFPL
        APLZL
        VORNR
        BANFN
        BNFPO
        STEUS       "工序外协控制码 by hsx on 2013.09.06
        LTXA1       "工序短文本1
        OBJNR
      FROM AFVC
      INTO CORRESPONDING FIELDS OF TABLE TAB_AFVC
      FOR ALL ENTRIES IN TAB_AFKO
      WHERE AUFPL = TAB_AFKO-AUFPL.
      IF SY-SUBRC = 0 .
        IF TAB_AFVC IS NOT INITIAL.

          "BY HSX ON 2013.09.17 BEGIN
          SELECT OBJNR STAT
            FROM JEST
            INTO CORRESPONDING FIELDS OF TABLE OBJECTSTATUS
            FOR ALL ENTRIES IN TAB_AFVC
            WHERE OBJNR = TAB_AFVC-OBJNR AND STAT = 'I0013'.

          CLEAR REC_AFVC.
          LOOP AT TAB_AFVC INTO REC_AFVC.
            READ TABLE OBJECTSTATUS WITH KEY OBJNR = REC_AFVC-OBJNR.
            IF SY-SUBRC = 0.
              REC_AFVC-IFDEL = 'Y'.
              MODIFY TAB_AFVC FROM REC_AFVC.
            ENDIF.
            CLEAR REC_AFVC.
          ENDLOOP.

          TAB_AFVC_DEL = TAB_AFVC.

          DELETE TAB_AFVC_DEL WHERE IFDEL = ''.
          DELETE TAB_AFVC WHERE IFDEL = 'Y'.
          "END

          SELECT
            EBELN
            EBELP
            BANFN
            BNFPO
          FROM EKPO
          INTO CORRESPONDING FIELDS OF TABLE TAB_EKPO
          FOR ALL ENTRIES IN TAB_AFVC
          WHERE BANFN = TAB_AFVC-BANFN
            AND BNFPO = TAB_AFVC-BNFPO.

          TAB_AFVC_TMP1 = TAB_AFVC.
          SORT TAB_AFVC_TMP1 BY  AUFPL  VORNR DESCENDING.

          LOOP AT TAB_AFVC INTO REC_AFVC.
            ON CHANGE OF REC_AFVC-AUFPL.
              APPEND REC_AFVC TO TAB_AFVC_TMP.
            ENDON.
          ENDLOOP.

          "by hsx on 2013.09.06 begin
          TAB_AFVC_EXISTPR = TAB_AFVC.
          DELETE TAB_AFVC_EXISTPR WHERE BANFN = ''.

          SELECT
            BANFN
            BNFPO
            EBELN
            EBELP
          FROM EBAN
          INTO CORRESPONDING FIELDS OF TABLE TABEBAN
            FOR ALL ENTRIES IN TAB_AFVC_EXISTPR
            WHERE BANFN = TAB_AFVC_EXISTPR-BANFN
              AND BNFPO = TAB_AFVC_EXISTPR-BNFPO.

          LOOP AT TAB_AFVC INTO REC_AFVC.
            READ TABLE TABEBAN WITH KEY BANFN = REC_AFVC-BANFN BNFPO = REC_AFVC-BNFPO.
            IF SY-SUBRC = 0.
              REC_AFVC-EBELN = TABEBAN-EBELN.
              REC_AFVC-EBELP = TABEBAN-EBELP.
              MODIFY TAB_AFVC FROM REC_AFVC.
            ENDIF.
          ENDLOOP.
          "end


*          IF TAB_AFVC_TMP IS NOT  INITIAL.
*            "取工艺路线对应的最后一道工序的确认产量即报工数量
*            SELECT AUFPL APLZL LMNGA
*            FROM AFVV
*            INTO CORRESPONDING FIELDS OF TABLE TABAFVV
*            FOR ALL ENTRIES IN TAB_AFVC_TMP
*            WHERE AUFPL = TAB_AFVC_TMP-AUFPL
*              AND APLZL = TAB_AFVC_TMP-APLZL.
*            "END
*          ENDIF.

          "BY HSX ON 2013.07.15 BEGIN 代替上面注释行
          "BY HSX ON 2013.07.04 BEGIN
          "取工艺路线对应的所有工序的确认产量即报工数量
          SELECT AUFPL APLZL LMNGA
          FROM AFVV
          INTO CORRESPONDING FIELDS OF TABLE TABAFVV
          FOR ALL ENTRIES IN TAB_AFKO
          WHERE AUFPL = TAB_AFKO-AUFPL.

          CLEAR REC_AFVC.
          LOOP AT TABAFVV.
            READ TABLE TAB_AFVC_DEL INTO REC_AFVC WITH KEY AUFPL = TABAFVV-AUFPL APLZL = TABAFVV-APLZL.
            IF SY-SUBRC = 0.
              DELETE TABAFVV.
            ENDIF.
            CLEAR REC_AFVC.
          ENDLOOP.

          "END
          "END



        ENDIF.

      ENDIF.



      TAB_AFKO_TMP = TAB_AFKO.

      SORT TAB_AFKO_TMP BY PLNBEZ.

      DELETE ADJACENT DUPLICATES FROM TAB_AFKO_TMP.

      IF TAB_AFKO_TMP IS NOT INITIAL.

        SELECT
          MATNR
          MAKTX
        FROM MAKT
        INTO TABLE TAB_MAKT
        FOR ALL ENTRIES IN TAB_AFKO_TMP
        WHERE MATNR = TAB_AFKO_TMP-PLNBEZ.

      ENDIF.

      SELECT
        AUFNR
        PROJN
        WEMNG
        MEINS
      FROM  AFPO
      INTO CORRESPONDING FIELDS OF TABLE TAB_AFPO
      FOR ALL ENTRIES IN TAB_AFKO
      WHERE AUFNR = TAB_AFKO-AUFNR.


      SELECT
        MATNR
        ZEINR
      FROM MARA
      INTO CORRESPONDING FIELDS OF TABLE TAB_MARA
      FOR ALL ENTRIES IN TAB_AFKO_TMP
      WHERE MATNR = TAB_AFKO_TMP-PLNBEZ.


    ENDIF.

  ENDIF.


ENDFORM.                    " SUB_GET_DATA


*&---------------------------------------------------------------------*
*&      Form  SUB_EDIT_DATA
*&---------------------------------------------------------------------*
*       设置
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_EDIT_DATA .

  DATA:REC_ALVOUT   TYPE TY_ALVOUT.
  DATA:REC_AUFK     TYPE TY_AUFK.
  DATA:REC_AFKO     TYPE TY_AFKO.
  DATA:REC_MAKT     TYPE TY_MAKT.
  DATA:REC_AFPO     TYPE TY_AFPO.
  DATA:REC_EKPO     TYPE TY_EKPO.
  DATA:REC_AFVC     TYPE TY_AFVC.
  DATA:REC_PRINTLOG TYPE TY_PRINTLOG.
  DATA:REC_STYL_LN  TYPE LVC_S_STYL.
  DATA:TAB_STYL     TYPE LVC_T_STYL.
  DATA:REC_PROJN    TYPE CHAR24.
  DATA:REC_MARA     TYPE TY_MARA.
  DATA:REC_JEST     TYPE TY_JEST.
  DATA:TAB_AFVC_TMP TYPE STANDARD TABLE OF TY_AFVC.
  "by hsx on 2013.09.06 begin(单个工艺路线的工序)
  DATA:TAB_AFVC_SINGLEAUFPL TYPE STANDARD TABLE OF TY_AFVC.
  DATA:WA_AFVC_SINGLEAUFPL TYPE TY_AFVC.
  "end

  FIELD-SYMBOLS:<FSOUT> TYPE TY_ALVOUT.

  LOOP AT TAB_AUFK INTO REC_AUFK.
    CLEAR REC_ALVOUT.

    REC_ALVOUT-AUART = REC_AUFK-AUART."订单类型
    REC_ALVOUT-AUFNR = REC_AUFK-AUFNR."生产订单号

    READ TABLE TAB_JEST INTO   REC_JEST WITH KEY OBJNR = REC_AUFK-OBJNR.
    IF SY-SUBRC eq 0."Kyle 20190610 技术性完成的订单，不予打印 508行校验
      CONTINUE.
      CLEAR REC_ALVOUT.
    ENDIF.

    READ TABLE TAB_AFKO INTO REC_AFKO
    WITH KEY AUFNR = REC_AUFK-AUFNR.


    IF SY-SUBRC = 0.

      REC_ALVOUT-DISPO = REC_AFKO-DISPO."MRP控制者
      REC_ALVOUT-FEVOR = REC_AFKO-FEVOR."生产调度员
      REC_ALVOUT-PLNBEZ = REC_AFKO-PLNBEZ."物料号


      REC_ALVOUT-GAMNG = REC_AFKO-GAMNG."订单数
      REC_ALVOUT-PLNBEZ = REC_AFKO-PLNBEZ."物料号
      REC_ALVOUT-GAMNG = REC_AFKO-GAMNG."订单数
      REC_ALVOUT-GSTRP = REC_AFKO-GSTRP."基本开始日期
      REC_ALVOUT-GLTRP = REC_AFKO-GLTRP."基本结束日期

      IF  REC_AFKO-AUFPL IS NOT INITIAL.
        "by hsx on 2013.09.18 begin
*        TAB_AFVC_TMP  = TAB_AFVC.
*
*        DELETE TAB_AFVC_TMP WHERE AUFPL <> REC_AFKO-AUFPL.
*
*        SORT TAB_AFVC_TMP BY AUFPL APLZL.
*        DATA:REC_LINE TYPE I.
*
*        DESCRIBE TABLE TAB_AFVC_TMP LINES REC_LINE.
*
*        READ TABLE TAB_AFVC_TMP INTO REC_AFVC INDEX REC_LINE.
*        IF  SY-SUBRC = 0.
*          IF REC_AFVC-BANFN IS NOT INITIAL.
*            READ TABLE TAB_EKPO INTO REC_EKPO WITH KEY BANFN = REC_AFVC-BANFN
*                                                       BNFPO = REC_AFVC-BNFPO.
*
*            IF SY-SUBRC = 0.
*
*              REC_ALVOUT-EBELN  = REC_EKPO-EBELN."采购订单
*              SHIFT REC_ALVOUT-EBELN LEFT DELETING LEADING '0'.
*
*            ENDIF.
*          ENDIF.
*
*        ENDIF.
        "end


        "BY HSX ON 2013.09.06 BEGIN
        TAB_AFVC_SINGLEAUFPL = TAB_AFVC.
        DELETE TAB_AFVC_SINGLEAUFPL WHERE AUFPL <> REC_AFKO-AUFPL.
        LOOP AT TAB_AFVC_SINGLEAUFPL INTO WA_AFVC_SINGLEAUFPL.
          IF WA_AFVC_SINGLEAUFPL-STEUS = 'ZP02'.
            IF WA_AFVC_SINGLEAUFPL-LTXA1 NS '回火'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '打砂'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '淬火'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '退火'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '打磨'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '线切割'
               AND WA_AFVC_SINGLEAUFPL-LTXA1 NS '发黑'.
              REC_ALVOUT-EBELN = WA_AFVC_SINGLEAUFPL-EBELN.
              REC_ALVOUT-EBELP = WA_AFVC_SINGLEAUFPL-EBELP.
              EXIT.                                         "假设目前只有一个工序外协
            endif.
          ENDIF.
        ENDLOOP.
        "END

      ENDIF.

      READ TABLE TAB_MAKT INTO REC_MAKT WITH KEY MATNR = REC_AFKO-PLNBEZ.
      IF SY-SUBRC = 0.
        REC_ALVOUT-MAKTX = REC_MAKT-MAKTX."物料描述
      ENDIF.

      READ TABLE TAB_AFPO INTO REC_AFPO WITH KEY AUFNR = REC_AFKO-AUFNR.

      IF SY-SUBRC = 0.

        "REC_ALVOUT-WEMNG = REC_AFKO-GAMNG - REC_AFPO-WEMNG."入库数量

        "BY HSX ON 2013.07.15 BEGIN 注释此部分，使用后面代码代替
*        "BY HSX ON 2013.07.04 BEGIN
*        IF P_AGAIN = ''.
*          IF REC_AFKO-GAMNG = REC_AFPO-WEMNG. "判断交货数量是否等于订单数量，如果相同即交货完，排除此记录
*            CONTINUE.
*            CLEAR REC_ALVOUT.
*          ELSE.
*            "取工艺路线对应的所有工序的确认产量即报工数量
**              CLEAR TABAFVVSINGLEAUFPL[].
**              LOOP AT TABAFVV WHERE AUFPL = REC_AFKO-AUFPL.
**                      CLEAR TABAFVVSINGLEAUFPL.
**                      TABAFVVSINGLEAUFPL-AUFPL = TABAFVV-AUFPL.
**                      TABAFVVSINGLEAUFPL-APLZL = TABAFVV-APLZL.
**                      TABAFVVSINGLEAUFPL-LMNGA = TABAFVV-LMNGA.
**                      APPEND TABAFVVSINGLEAUFPL.
**              ENDLOOP.
**
**             "排序内表并取第一行数据
**             SORT TABAFVVSINGLEAUFPL DESCENDING BY APLZL.
**             READ TABLE TABAFVVSINGLEAUFPL INTO WAAFVV INDEX 1.
*
*            SORT TABAFVV BY AUFPL ASCENDING APLZL DESCENDING.
*            READ TABLE TABAFVV INTO WAAFVV WITH KEY AUFPL = REC_AFKO-AUFPL.
*            IF SY-SUBRC = 0.
*              "取报工数量减去交货数量
*              REC_ALVOUT-WEMNG =  WAAFVV-LMNGA - REC_AFPO-WEMNG.
*            ENDIF.
*
*          ENDIF.
*        ELSE.
*            "重新打印时,报工数目=订单数目
*            REC_ALVOUT-WEMNG =  REC_AFKO-GAMNG.
*        ENDIF.
*
*        "END
        "END

        "BY HSX ON 2013.07.15 BEGIN
        IF REC_AFKO-GAMNG = REC_AFPO-WEMNG. "判断交货数量是否等于订单数量，如果相同即交货完，排除此记录
*            CONTINUE.
*            CLEAR REC_ALVOUT.
          "BY HSX ON 2013.09.05 BEGIN(替代上面注释的两行，因为重打这种情况除外)
          IF P_AGAIN = ''.
            CONTINUE.
            CLEAR REC_ALVOUT.
          ELSE.
            REC_ALVOUT-WEMNG = REC_AFKO-GAMNG.
          ENDIF.
          "END

          "by hsx on 2013.09.17 begin(判断订单对应的所有工序是否报工完成)
          LOOP AT TABAFVV  INTO WAAFVV  WHERE AUFPL = REC_AFKO-AUFPL.
            IF WAAFVV-LMNGA = 0.
              REC_ALVOUT-PROFINISH = 'N'.
              EXIT.
            ENDIF.
          ENDLOOP.
          "end

        ELSE.
          "取工艺路线对应的所有工序的确认产量即报工数量
*              CLEAR TABAFVVSINGLEAUFPL[].
*              LOOP AT TABAFVV WHERE AUFPL = REC_AFKO-AUFPL.
*                      CLEAR TABAFVVSINGLEAUFPL.
*                      TABAFVVSINGLEAUFPL-AUFPL = TABAFVV-AUFPL.
*                      TABAFVVSINGLEAUFPL-APLZL = TABAFVV-APLZL.
*                      TABAFVVSINGLEAUFPL-LMNGA = TABAFVV-LMNGA.
*                      APPEND TABAFVVSINGLEAUFPL.
*              ENDLOOP.
*
*             "排序内表并取第一行数据
*             SORT TABAFVVSINGLEAUFPL DESCENDING BY APLZL.
*             READ TABLE TABAFVVSINGLEAUFPL INTO WAAFVV INDEX 1.

          SORT TABAFVV BY AUFPL ASCENDING APLZL DESCENDING.
          READ TABLE TABAFVV INTO WAAFVV WITH KEY AUFPL = REC_AFKO-AUFPL.

          "取报工数量减去交货数量
          REC_ALVOUT-WEMNG =  WAAFVV-LMNGA - REC_AFPO-WEMNG.


          "by hsx on 2013.09.17 begin(判断订单对应的所有工序是否报工完成) Kyle 20190610 生产订单不报工，非技术性完成，也可入库 梁翠媚透明工厂需求
*          LOOP AT TABAFVV  INTO WAAFVV  WHERE AUFPL = REC_AFKO-AUFPL.
*            IF WAAFVV-LMNGA = 0.
*              REC_ALVOUT-PROFINISH = 'N'.
*              EXIT.
*            ENDIF.
*          ENDLOOP.
          "end


        ENDIF.
        "END

        REC_ALVOUT-MEINS =  REC_AFKO-GMEIN."单位

        CALL FUNCTION 'CONVERSION_EXIT_ABPSP_OUTPUT'
          EXPORTING
            INPUT  = REC_AFPO-PROJN
          IMPORTING
            OUTPUT = REC_PROJN.

        REC_ALVOUT-PSPEL = REC_PROJN."WBS元素

      ENDIF.
*      IF REC_ALVOUT-WEMNG = 0.
*        CONTINUE.
*      ENDIF.
      READ TABLE TAB_MARA INTO REC_MARA WITH KEY MATNR = REC_AFKO-PLNBEZ.

      IF SY-SUBRC = 0.
        REC_ALVOUT-ZEINR = REC_MARA-ZEINR."图号
      ENDIF.

      APPEND REC_ALVOUT TO TAB_ALVOUT.
    ENDIF.

  ENDLOOP.

*  LOOP AT TAB_ALVOUT INTO REC_ALVOUT. Kyle 20190606 生产订单入库不判断是否已经完工
*    IF REC_ALVOUT-PROFINISH = 'N'.
*      DELETE TAB_ALVOUT.
*    ENDIF.
*  ENDLOOP.

  IF TAB_ALVOUT IS INITIAL.

    MESSAGE '没有符合条件的数据！' TYPE 'S' DISPLAY LIKE 'E'.
    STOP.

  ENDIF.

  IF TAB_ALVOUT IS NOT INITIAL.
    SELECT
      ZTCODE
      AUFNR
      ZPRINTNUM
      ZPRINTDATE
      ZPRINTUSER
    FROM ZPP0001T
    INTO CORRESPONDING FIELDS OF TABLE TAB_PRINTLOG
    FOR ALL ENTRIES IN TAB_ALVOUT
    WHERE ZTCODE = REC_FLAG
      AND AUFNR  = TAB_ALVOUT-AUFNR.

    "BY HSX ON 2013.08.14 BEGIN(拷贝重打数据)
    APPEND LINES OF TAB_PRINTLOG TO TAB_PRINTLOG_COPY.
    "END

  ENDIF.


  "BY HSX ON 2013.08.14 BEGIN(处理重打与不重打)
  CLEAR REC_ALVOUT.
  "如果不选择重复打印选项的处理(删除)
  IF P_AGAIN = ''.
    LOOP AT TAB_ALVOUT INTO REC_ALVOUT.
      CLEAR WA_PRINTLOG_COPY.
      READ TABLE TAB_PRINTLOG_COPY INTO WA_PRINTLOG_COPY WITH KEY AUFNR = REC_ALVOUT-AUFNR.
      IF SY-SUBRC = 0.
        DELETE TAB_ALVOUT WHERE AUFNR = REC_ALVOUT-AUFNR.
      ENDIF.
      CLEAR REC_ALVOUT.
    ENDLOOP.
  ELSE.
    "选择重新打印选项的处理(修改送检数量为订单数量，前面的送检数量处理并不对这部分进行处理)
    LOOP AT TAB_ALVOUT INTO REC_ALVOUT.
      CLEAR REC_AFKO.
      READ TABLE TAB_AFKO INTO REC_AFKO WITH KEY AUFNR = REC_ALVOUT-AUFNR.
      IF SY-SUBRC = 0.
        CLEAR REC_AFPO.
        READ TABLE TAB_AFPO INTO REC_AFPO WITH KEY AUFNR = REC_AFKO-AUFNR.
        IF SY-SUBRC = 0.
          CLEAR WA_PRINTLOG_COPY.
          READ TABLE TAB_PRINTLOG_COPY INTO WA_PRINTLOG_COPY WITH KEY AUFNR = REC_AFPO-AUFNR.
          IF SY-SUBRC = 0.
            REC_ALVOUT-WEMNG = REC_AFKO-GAMNG.
          ENDIF.
        ENDIF.
      ENDIF.
      MODIFY TAB_ALVOUT FROM REC_ALVOUT.
      CLEAR REC_ALVOUT.
    ENDLOOP.
  ENDIF.
  "END


  LOOP AT TAB_ALVOUT ASSIGNING <FSOUT>.
    CLEAR REC_PRINTLOG.
    READ TABLE TAB_PRINTLOG INTO REC_PRINTLOG WITH KEY  AUFNR = <FSOUT>-AUFNR.
    IF SY-SUBRC = 0.
      "BY HSX ON 2013.08.13 BEGIN
      "<FSOUT>-ZPRINTNUM   = REC_PRINTLOG-ZPRINTNUM + 1.
      <FSOUT>-ZPRINTNUM   = REC_PRINTLOG-ZPRINTNUM.
      "END
*      <FSOUT>-ZPRINTDATE  = SY-DATUM.
*      <FSOUT>-ZPRINTUSER  = SY-UNAME.
      <FSOUT>-ZPRINTDATE  = REC_PRINTLOG-ZPRINTDATE.
      <FSOUT>-ZPRINTUSER  = REC_PRINTLOG-ZPRINTUSER.

    ENDIF.



    "IF <FSOUT>-ZPRINTNUM > 5.

*      REC_STYL_LN-FIELDNAME = 'ZFLAG'.
*      REC_STYL_LN-STYLE = CL_GUI_ALV_GRID=>MC_STYLE_DISABLED.
*
*      APPEND REC_STYL_LN TO TAB_STYL.

    "ENDIF.

    <FSOUT>-STYL  = TAB_STYL.

  ENDLOOP.


  "BY HSX ON 2013.08.14 BEGIN

  "END


ENDFORM.                    " SUB_EDIT_DATA
*&---------------------------------------------------------------------*
*&      Form  SUB_INIT
*&---------------------------------------------------------------------*
*       初始化
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_INIT .

  REC_FLAG = 'ZPP007'.

ENDFORM.                    " SUB_INIT
*&---------------------------------------------------------------------*
*&      Form  SUB_DISPLAY_ALV
*&---------------------------------------------------------------------*
*       ALV 输出
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_DISPLAY_ALV .

  DATA: TAB_FIELDCAT TYPE LVC_T_FCAT,
        REC_FIELDCAT_LN TYPE LVC_S_FCAT,
        REC_LAYOUT TYPE LVC_S_LAYO.



  DATA: REC_GLAY TYPE  LVC_S_GLAY.

  REC_GLAY-EDT_CLL_CB  = 'X' .

  PERFORM SUB_SET_FIELCAT CHANGING TAB_FIELDCAT
                                   REC_LAYOUT.

  CALL FUNCTION 'REUSE_ALV_GRID_DISPLAY_LVC'
    EXPORTING
      I_CALLBACK_PROGRAM       = SY-CPROG
*     I_GRID_TITLE             = REC_TITLE
      I_GRID_SETTINGS          = REC_GLAY
      IS_LAYOUT_LVC            = REC_LAYOUT
      IT_FIELDCAT_LVC          = TAB_FIELDCAT
*     IT_SORT_LVC              = TAB_SORT
      I_SAVE                   = 'A'
      I_CALLBACK_PF_STATUS_SET = 'SUB_SET_STATUS'
      I_CALLBACK_USER_COMMAND  = 'SUB_USER_COMMAND'
    TABLES
      T_OUTTAB                 = TAB_ALVOUT
    EXCEPTIONS
      PROGRAM_ERROR            = 1
      OTHERS                   = 2.


ENDFORM.                    " SUB_DISPLAY_ALV

*&---------------------------------------------------------------------*
*&      Form  SUB_SET_FIELCAT
*&---------------------------------------------------------------------*
*       设置ALV
*----------------------------------------------------------------------*
*      <--P_TAB_FIELDCAT  text
*      <--P_REC_LAYOUT  text
*----------------------------------------------------------------------*
FORM SUB_SET_FIELCAT  CHANGING P_TAB_FIELDCAT TYPE LVC_T_FCAT
                                P_REC_LAYOUT   TYPE LVC_S_LAYO.

  DATA:REC_FIELDCAT_LN TYPE LVC_S_FCAT.


  P_REC_LAYOUT-ZEBRA             = 'X'.
  P_REC_LAYOUT-CWIDTH_OPT        = 'X'.
  P_REC_LAYOUT-NO_ROWMARK        = 'X'.
  P_REC_LAYOUT-STYLEFNAME        = 'STYLE'.

  DEFINE FILL_FIELDCAT.

    CLEAR REC_FIELDCAT_LN.
    REC_FIELDCAT_LN-FIELDNAME     = &1.
    REC_FIELDCAT_LN-REPTEXT       = &2.
    REC_FIELDCAT_LN-NO_ZERO       = &3.
*    REC_FIELDCAT_LN-EDIT          = &4.
*    REC_FIELDCAT_LN-DECIMALS_O       = &5.

    APPEND REC_FIELDCAT_LN TO P_TAB_FIELDCAT.

  END-OF-DEFINITION.

  CLEAR REC_FIELDCAT_LN.
  REC_FIELDCAT_LN-CHECKBOX = 'X'.
  REC_FIELDCAT_LN-EDIT          = 'X'.
  REC_FIELDCAT_LN-FIELDNAME     = 'ZFLAG'.
  REC_FIELDCAT_LN-REPTEXT       = '选择'.


  APPEND REC_FIELDCAT_LN TO P_TAB_FIELDCAT.

  FILL_FIELDCAT 'AUART' '订单类型' '' .
  FILL_FIELDCAT 'AUFNR' '生产订单号' 'X'.
  FILL_FIELDCAT 'DISPO' 'MRP控制者' ''.
  FILL_FIELDCAT 'FEVOR' '生产调度员' ''.
  FILL_FIELDCAT 'PSPEL' 'WBS元素' ''.
  FILL_FIELDCAT 'PLNBEZ' '物料号' 'X'.
  FILL_FIELDCAT 'MAKTX' '物料描述' ''.
  FILL_FIELDCAT 'ZEINR' '图号' ''.
  FILL_FIELDCAT 'GAMNG' '订单数' ''.
  FILL_FIELDCAT 'GSTRP' '基本开始日期' ''.
  FILL_FIELDCAT 'GLTRP' '基本完成日期' ''.
  FILL_FIELDCAT 'ZPRINTNUM' '打印次数' ''.
  FILL_FIELDCAT 'ZPRINTDATE' '最后打印日期' ''.
  FILL_FIELDCAT 'ZPRINTUSER' '最后打印人员' ''.




ENDFORM.                    " SUB_SET_FIELCAT



*&---------------------------------------------------------------------*
*&      Form  SUB_USER_COMMAND
*&---------------------------------------------------------------------*
*       报表打印
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_USER_COMMAND USING R_UCOMM LIKE SY-UCOMM
                            RS_SELFIELD TYPE SLIS_SELFIELD.
*

  DATA:TAB_SELECT TYPE STANDARD TABLE OF TY_ALVOUT.
  DATA:REC_ALVOUT TYPE TY_ALVOUT.
  DATA:REC_TABNAME TYPE CHAR10.
  DATA:REC_FUNNAME  TYPE RS38L_FNAM.
  DATA:REC_OUTINFO  TYPE SSFCRESCL.
  DATA:REC_OUTPUT    TYPE SSFCOMPOP.

  FIELD-SYMBOLS:<FS_ALVTAB> TYPE TY_ALVOUT.
  FIELD-SYMBOLS:<FIELD>    TYPE ANY.

  DATA:REC_ZPPPRINTLOG TYPE ZPP0001T.
  DATA:TAB_ZPPPRINTLOG TYPE STANDARD TABLE OF ZPP0001T.

  "by hsx on 2013.09.17 begin
  DATA:PROFINISHMESSAGE(40) TYPE C.
  "end


  CONCATENATE REC_FLAG 'TAB' INTO REC_TABNAME.

  IF R_UCOMM = 'PRINTSF'.

    TAB_SELECT = TAB_ALVOUT.

    DELETE TAB_SELECT WHERE ZFLAG <> 'X'.
    DELETE TAB_SELECT WHERE PROFINISH = 'N'.

    IF TAB_SELECT IS NOT INITIAL.


      "by hsx on 2013.09.17 begin(判断所选择的订单有无存在工序没有报工的情况)
      read table TAB_SELECT into rec_alvout with KEY PROFINISH = 'N'.
      IF SY-SUBRC = 0.
        SHIFT REC_ALVOUT-AUFNR LEFT DELETING LEADING '0'.
        CONCATENATE '订单(' REC_ALVOUT-AUFNR ')' '仍存在工序未报工，请检查！' into PROFINISHMESSAGE.
        MESSAGE PROFINISHMESSAGE TYPE 'E'.
      ENDIF.
      "end


*      Lock table

*      打印输出

      EXPORT A = TAB_SELECT TO MEMORY ID REC_TABNAME.


      CALL FUNCTION 'SSF_FUNCTION_MODULE_NAME'
        EXPORTING
          FORMNAME           = 'ZSF0005'
*         VARIANT            = ' '
*         DIRECT_CALL        = ' '
        IMPORTING
          FM_NAME            = REC_FUNNAME
        EXCEPTIONS
          NO_FORM            = 1
          NO_FUNCTION_MODULE = 2
          OTHERS             = 3.
      IF SY-SUBRC <> 0.
        MESSAGE ID SY-MSGID TYPE SY-MSGTY NUMBER SY-MSGNO
               WITH SY-MSGV1 SY-MSGV2 SY-MSGV3 SY-MSGV4.
      ENDIF.

      CLEAR REC_OUTINFO.

      CALL FUNCTION REC_FUNNAME
        EXPORTING
          OUTPUT_OPTIONS  = REC_OUTPUT
          REC_PARATABNAME = REC_TABNAME
        IMPORTING
          JOB_OUTPUT_INFO = REC_OUTINFO.

*       打印成功
      IF REC_OUTINFO-OUTPUTDONE = 'X'.
        LOOP AT TAB_SELECT INTO REC_ALVOUT.
          REC_ZPPPRINTLOG-MANDT       = SY-MANDT.
          REC_ZPPPRINTLOG-ZTCODE      = REC_FLAG.
          REC_ZPPPRINTLOG-AUFNR       = REC_ALVOUT-AUFNR.

          REC_ZPPPRINTLOG-ZPRINTNUM   = REC_ALVOUT-ZPRINTNUM + 1.
          REC_ZPPPRINTLOG-ZPRINTDATE  = SY-DATUM.
          REC_ZPPPRINTLOG-ZPRINTUSER  = SY-UNAME.

          APPEND REC_ZPPPRINTLOG TO TAB_ZPPPRINTLOG.
        ENDLOOP.


        "BY HSX ON 2013.08.13 BEGIN
        "UPDATE  ZPP0001T FROM  TABLE TAB_ZPPPRINTLOG.
        MODIFY  ZPP0001T FROM  TABLE TAB_ZPPPRINTLOG.
        "END

        IF SY-SUBRC = 0.
          COMMIT WORK.
        ELSE.
          ROLLBACK WORK.
        ENDIF.
*       更新日志表
      ENDIF.
      FREE MEMORY ID REC_TABNAME.
    ENDIF.

  ELSEIF R_UCOMM = 'SELALL'.


    LOOP AT TAB_ALVOUT ASSIGNING <FS_ALVTAB>.

      ASSIGN COMPONENT 'ZFLAG' OF STRUCTURE <FS_ALVTAB> TO <FIELD>.
      <FIELD> = 'X'.

    ENDLOOP.

    RS_SELFIELD-REFRESH = 'X'.

  ELSEIF R_UCOMM = 'DESELALL'.

    LOOP AT TAB_ALVOUT ASSIGNING <FS_ALVTAB>.

      ASSIGN COMPONENT 'ZFLAG' OF STRUCTURE <FS_ALVTAB> TO <FIELD>.
      <FIELD> = ''.

    ENDLOOP.
    RS_SELFIELD-REFRESH = 'X'.
  ENDIF.

*       free table



ENDFORM.                    "SUB_USER_COMMAND

*&---------------------------------------------------------------------*
*&      Form  SUB_SET_STATUS
*&---------------------------------------------------------------------*
*       报表打印
*----------------------------------------------------------------------*
*----------------------------------------------------------------------*
FORM SUB_SET_STATUS USING EXTAB TYPE SLIS_T_EXTAB.

  SET PF-STATUS 'STANDARD_FULLSCREEN'.


ENDFORM.                    "SUB_SET_STATUS